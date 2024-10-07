import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// export const runtime = 'edge';

async function extractTextFromUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Basic HTML parsing (this is a simplified version and may not catch all cases)
    const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || '';
    const strippedContent = bodyContent
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return strippedContent;
  } catch (error) {
    console.error('Error extracting text from URL:', error);
    return '';
  }
}

export async function POST(request: Request) {
  try {
    const { message, language } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const jobDescription = await extractTextFromUrl(message);
    const profile = 'https://www.ogdigital.de/';
    const profileDescription = await extractTextFromUrl(profile);
    const key = process.env.MY_KEY;
    const openai = new OpenAI({
      apiKey: key
    });

    const promptLanguage = language === 'de' ? 'German' : 'English';
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `My Name is Oleg and I speak German and English very well. The following text contains my profile ${profileDescription} with my projects, education, stack, and approach. The following text contains a job description: "${jobDescription}". Tell me if Oleg would be a good candidate for this job by comparing Oleg's skills in technology to the skills needed in the job description. Tell me what skills or experience Oleg lacks based on the job description, but describe it in detail as a nice text. Please read Oleg's profile and the job description carefully and don't use any frameworks, libraries, programming languages, or other technology that is not explicitly mentioned on both textes. Please don't use any links in your answer and avoid signs like **, [], (), etc. Send me an answer as text in ${promptLanguage} without starting with phrases like "Sure, here's a post for you:".` }],
      model: "gpt-4",
    });

    const answer = completion.choices[0].message.content;
    
    const response = `${answer}` ;

    

    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
