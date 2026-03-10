// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req: Request) {
  
// try {
//      const  prompt  ="Create a list of three open ended and engaging questions formatted as a single string.Each question should be separated by '||'.These questions are for anonymous social messaging platform like Qooh.me,and should be suitable for a diverse audience.Avoid personal or sensitive topics,focusing instead on universla themes that encourage friendly interaction.For example,your output should be strutured like this :'Whats a hobby u've recently started? || If you could have a dinner with any historical figure,who would it be ?|| Whats a simple thing that makes you happy?'. Ensure the questions are intriguing ,foster curiosity, and contribute to a positive and welcoming conversational environment."
    
//       const genAI = new GoogleGenerativeAI(
//         process.env.GEMINI_API_KEY!
//       );
    
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//       });
    
//       const result = await model.generateContent(prompt);
//       const text = result.response.text();
    
//       return Response.json({ text });
// } catch (error) {
//     if(error instanceof Error){
//     return Response.json({error:error.message},{status:500})
//     }
// else {
//     console.log("An unexpected error eocured",error)
//     return Response.json({error:"An unexpected error eocured"},{status:500})
// }

    
// }
// }
// import { google, GoogleLanguageModelOptions } from '@ai-sdk/google';
// import { generateText } from 'ai';



// export async function POST(req: Request) {
//   try {

//     const prompt = `
// Create a list of three open ended and engaging questions formatted as a single string.

// Each question should be separated by '||'.

// These questions are for an anonymous social messaging platform like Qooh.me and should be suitable for a diverse audience.

// Avoid personal or sensitive topics and focus on universal themes that encourage friendly interaction.

// Example format:
// "What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?"

// Ensure the questions are intriguing, foster curiosity, and create a positive conversation environment.
// `;

   

//    const genAI = new google.GoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY!,  
// });

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//     });
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     return Response.json({ text }, { status: 200 });

//   } catch (error) {

//     if (error instanceof Error) {
//       return Response.json(
//         { error: error.message },
//         { status: 500 }
//       );
//     }

//     console.log("An unexpected error occurred", error);

//     return Response.json(
//       { error: "An unexpected error occurred" },
//       { status: 500 }
//     );
//   }
// }
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {

    const prompt = `
Create a list of three open ended and engaging questions formatted as a single string.

Each question should be separated by '||'.

These questions are for an anonymous social messaging platform like Qooh.me and should be suitable for a diverse audience.

Avoid personal or sensitive topics and focus on universal themes that encourage friendly interaction.

Example format:
"What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?"

Ensure the questions are intriguing, foster curiosity, and create a positive conversation environment.
`;

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
    });

    return Response.json({ text }, { status: 200 });

  } catch (error) {

    if (error instanceof Error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.error("Unexpected error:", error);

    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}