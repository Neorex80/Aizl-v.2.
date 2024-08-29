import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from 'fs';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { selectedModel, messages, file } = await req.json();

    let imagePart = null;
    if (file) {
      const uploadResponse = await fileManager.uploadFile(file.name, {
        mimeType: file.type,
        displayName: file.name,
      });
      imagePart = {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        }
      };
    }

    const chatCompletion = await genAI.getGenerativeModel({ model: selectedModel })
      .generateContent([
        ...messages,
        imagePart && { parts: [imagePart] }
      ].filter(Boolean));

    const responseContent = chatCompletion.response.text();

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