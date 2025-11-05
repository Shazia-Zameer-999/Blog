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

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Empty message." }, { status: 400 });
    }

    // ✅ Use the new Hugging Face Inference Router endpoint
    const response = await fetch("https://router.huggingface.co/hf-inference", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: HF_MODEL, // specify model name here
        inputs: `User: ${message}\nAssistant:`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    });

    const data = await response.json();
    console.log("HF response:", data);

    let reply = "";

    // ✅ Handle the new Hugging Face Router response shape
    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text.trim();
    } else if (data?.generated_text) {
      reply = data.generated_text.trim();
    } else if (data?.error) {
      reply = "⚠️ Model error: " + data.error;
    } else if (data?.results?.[0]?.generated_text) {
      reply = data.results[0].generated_text.trim();
    } else {
      reply = "Sorry, I didn’t get that.";
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}