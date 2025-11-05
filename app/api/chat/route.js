export async function POST(req) {
  const { message } = await req.json();

  if (message.includes("service")) {
    return Response.json({ reply: "I offer Web Development, Design, and SEO services." });
  }

  return Response.json({ reply: "I'm not sure about that, could you rephrase?" });
}