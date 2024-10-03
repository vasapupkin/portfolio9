import { NextRequest, NextResponse } from 'next/server';
import { getClientIp } from 'request-ip';
import UAParser from 'ua-parser-js';
import axios from 'axios';
import clientPromise from '@/lib/mongodb';


export async function POST(request: NextRequest) {
  return handleVisit(request);
}

async function getIpInfo(ip: string) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return null;
  }
}

async function handleVisit(request: NextRequest) {
  const ip = getClientIp(request as any) || request.ip || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  
  const ipInfo = await getIpInfo(ip);
  
  const data = {
    ip,
    time: new Date().toISOString(),
    country: ipInfo?.country || 'unknown',
    city: ipInfo?.city || 'unknown',
    region: ipInfo?.regionName || 'unknown',
    ll: [ipInfo?.lat || 0, ipInfo?.lon || 0],
    device: parser.getDevice(),
    browser: parser.getBrowser(),
    os: parser.getOS(),
  };

  try {
    const client = await clientPromise;
    const db = client.db('visitor_logs');
    await db.collection('visits').insertOne(data);
    return NextResponse.json({ success: true, message: 'Visit logged successfully' });
  } catch (error) {
    console.error('Error storing visit:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
