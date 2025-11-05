// export async function POST(req) {
//   const { message } = await req.json();

//   if (message.includes("service")) {
//     return Response.json({ reply: "I offer Web Development, Design, and SEO services." });
//   }

//   return Response.json({ reply: "I'm not sure about that, could you rephrase?" });
// }
// app/api/chat/route.js
import { NextResponse } from 'next/server'

const HF_TOKEN = process.env.HF_TOKEN
const HF_MODEL = process.env.HF_MODEL || 'microsoft/DialoGPT-medium' // choose model

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json()
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    // Build the input. Many HF conversational models accept simple "inputs" text.
    // For models that require a specific format, adapt this payload accordingly.
    const payload = { inputs: message }

    const resp = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await resp.json()

    // Different models return different shapes.
    // Common shape for generation: { generated_text: "..." } or an array of text generations.
    let reply = ''
    if (typeof data === 'string') {
      // sometimes HF returns plain string
      reply = data
    } else if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text
    } else if (data?.generated_text) {
      reply = data.generated_text
    } else if (data?.error) {
      return NextResponse.json({ error: data.error }, { status: 500 })
    } else {
      // fallback: try to extract any text fields
      reply = JSON.stringify(data).slice(0, 1000)
    }

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}