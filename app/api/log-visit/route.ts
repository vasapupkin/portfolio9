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
  // Log all headers for debugging
  console.log('All headers:', Object.fromEntries(request.headers));

  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const requestIp = getClientIp(request as any);

  console.log('X-Forwarded-For:', forwardedFor);
  console.log('X-Real-IP:', realIp);
  console.log('request-ip result:', requestIp);

  // Try to get the IP from various sources
  const ip = forwardedFor?.split(',')[0] || realIp || requestIp || request.ip || '127.0.0.1';
  console.log('Final detected IP:', ip);

  const userAgent = request.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  
  let ipInfo;
  if (ip !== '127.0.0.1') {
    ipInfo = await getIpInfo(ip);
  } else {
    // Use a placeholder IP for local testing
    ipInfo = await getIpInfo('8.8.8.8');
    console.log('Using placeholder IP for local testing');
  }
  
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

  console.log('Data to be inserted:', data);

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
