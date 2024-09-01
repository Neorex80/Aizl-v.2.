import Groq from "groq-sdk";

const GROQ_API_KEY = "gsk_BG3ke3M3IEsl0sj3Fb2nWGdyb3FYoIaM0wF25XUAgaoJfRuC9hU";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
  endpoint: "https://api.groq.ai/v1/chat/completions",
});

export async function POST(req) {
  try {
    const { selectedModel, messages } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: selectedModel,
    });

    // Ensure the response structure matches what the frontend expects
    const responseContent = chatCompletion.choices?.[0]?.message?.content || "No content received";

    return new Response(
      JSON.stringify({ response: responseContent }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
