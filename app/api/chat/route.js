// export async function POST(req) {
//   const { message } = await req.json();

//   if (message.includes("service")) {
//     return Response.json({ reply: "I offer Web Development, Design, and SEO services." });
//   }

//   return Response.json({ reply: "I'm not sure about that, could you rephrase?" });
// }
// app/api/chat/route.js
// app/api/chat/route.js
// src/app/api/chat/route.js

// src/app/api/chat/route.js

// src/app/api/chat/route.js

// src/app/api/chat/route.js

// src/app/api/chat/route.js

export async function POST(req) {
  try {
    const { message } = await req.json();

    console.log("🟦 Sending message to HF:", message);

    // ✅ FIX: Use the OpenAI-compatible v1 router
    const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

    const res = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      // ✅ FIX: Use the OpenAI-compatible body
      body: JSON.stringify({
        model: `${process.env.HF_MODEL}:hf-inference`, // This syntax is key!
        messages: [{ role: "user", content: message }],
        max_tokens: 500,
        stream: false,
      }),
    });

    console.log("🟪 HF status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ HF API Error:", errorText);
      return Response.json(
        { reply: `⚠️ Model error: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("🟨 HF raw response:", data);

    // ✅ FIX: Parse the OpenAI-compatible response
    const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't get that.";
    return Response.json({ reply });

  } catch (err) {
    console.error("❌ Chat API error:", err);
    return Response.json(
      { reply: "⚠️ Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}