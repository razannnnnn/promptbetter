import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import systemPrompt from "@/lib/systemPrompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { prompt } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const improved = completion.choices[0].message.content;
  return NextResponse.json({ result: improved });
}
