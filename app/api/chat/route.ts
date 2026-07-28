// import { google } from "@ai-sdk/google";

import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // model: google("gemini-2.0-flash"),
      model: groq('llama-3.3-70b-versatile'),
      messages,
    });

    // تنظیم هدر UTF-8 برای نمایش درست حروف فارسی
    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error in Groq Chat API:', error);
    return new Response(
      JSON.stringify({ error: 'خطا در ارتباط با هوش مصنوعی' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}