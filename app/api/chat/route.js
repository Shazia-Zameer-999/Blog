// export async function POST(req) {
//   const { message } = await req.json();

//   if (message.includes("service")) {
//     return Response.json({ reply: "I offer Web Development, Design, and SEO services." });
//   }

//   return Response.json({ reply: "I'm not sure about that, could you rephrase?" });
// }
// app/api/chat/route.js
import { NextResponse } from "next/server";

const HF_TOKEN = process.env.HF_TOKEN;
const HF_MODEL = process.env.HF_MODEL || "HuggingFaceH4/zephyr-7b-beta";

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json({ reply: "Please type a message first." });
    }

    const res = await fetch("https://router.huggingface.co/hf-inference", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: HF_MODEL,
        inputs: `User: ${message}\nAssistant:`,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    });

    const data = await res.json();
    console.log("HF RAW:", JSON.stringify(data, null, 2));

    // --- Try every known shape safely ---
    const reply =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      data?.results?.[0]?.generated_text ||
      data?.output_text ||
      data?.message ||
      "Sorry, I didn’t get that.";

    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { reply: "⚠️ Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}