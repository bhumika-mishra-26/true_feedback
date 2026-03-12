import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not defined in .env file" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = "Create a list of three open ended and engaging questions formatted as a single string. Each question should be separated by '||'. Example: 'What is your favorite book? || Where do you want to travel? || What makes you laugh?'";

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No response text from AI");
    }

    return Response.json({ text }, { status: 200 });

  } catch (error: any) {
    console.error("Detailed Gemini Error:", error);
    
    // Return the actual error message to help debugging
    return Response.json(
      { 
        error: "AI Error", 
        details: error.message || "Unknown error",
        text: "Error fetching suggestions. Please try again later. || || " // Fallback format
      },
      { status: 500 }
    );
  }
}
