import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAndIncrementLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";
import systemPrompt from "@/lib/systemPrompt";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { userId } = await auth();

    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      "unknown";

    const identifier = userId ?? ip;
    const isLoggedIn = !!userId;

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

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: "Prompt tidak boleh kosong." },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    const improved = completion.choices[0].message.content;
    return NextResponse.json({ result: improved, remaining });
  } catch (err) {
    console.error("improvePrompt error:", err);
    return NextResponse.json(
      { error: "Gagal memproses prompt. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
