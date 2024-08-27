
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(prompt) {
  try {
    const result = await model.generateContent({ prompt });
    const text = result.text;
    console.log(text);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const prompt = "Write a story about an AI and magic";
run(prompt);
