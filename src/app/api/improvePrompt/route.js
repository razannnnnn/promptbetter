import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { checkAndIncrementLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";
import systemPrompt from "@/lib/systemPrompt";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const session = await getServerSession(authOptions);

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "unknown";

  const identifier = session?.user?.id || ip;
  const isLoggedIn = !!session?.user;

  const { allowed, remaining } = await checkAndIncrementLimit(
    identifier,
    isLoggedIn
  );

  if (!allowed) {
    return NextResponse.json(
      {
        error: isLoggedIn
          ? "Limit harian 10 request sudah habis. Coba lagi besok."
          : "Limit harian 5 request sudah habis. Login untuk dapat 10 request/hari.",
        limitExceeded: true,
        isLoggedIn,
      },
      { status: 429 }
    );
  }

  const { prompt } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
  });

  const improved = completion.choices[0].message.content;
  return NextResponse.json({ result: improved, remaining });
}