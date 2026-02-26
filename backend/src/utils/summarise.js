import { genAI } from "../config/genAI.js";

export const summarizeResponse = async (query, context) => {
    try {
        if (!query || !context) {
            return {
                success: false,
                error: "Query and context are required for summarization"
            };
        }

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
            You are the ASTU Smart Complaint Assistant, an expert digital helper for Adama Science and Technology University.
Your goal is to assist students and staff with campus-related issues, explaining university policies, and guiding them through the complaint submission process.

Rules:
- Answer the user's question using ONLY the provided ASTU context data.
- Use a professional, helpful, and academic tone.
- If the query is about how to report something, explain that they can use the 'Launch Report' feature.
- If the query is about IT, Maintenance, or Dormitories, provide the specific steps found in the data.
- Do not make up university policies. If the data doesn't have the answer, politely refer them to the Dean of Students or the relevant department registrar.

Question:
${query}

Context Data:
${context}
      `
        });

        return {
            success: true,
            finalResponse: response.text
        };
    } catch (err) {
        console.error("Summarization error:", err);
        return {
            success: false,
            error: "LLM summarization failed: " + (err.message || "Unknown error")
        };
    }
};


export const generateGreetingResponse = async (query) => {
    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
You are the ASTU Smart Complaint Assistant. 
The user has greeted you. Respond with a welcoming, professional greeting that reflects the academic excellence of ASTU.
Briefly explain that you can help them navigate university policies, troubleshoot IT/maintenance issues, or track their complaints.

Greeting:
${query}
      `
        });

        return {
            success: true,
            finalResponse: response.text
        };
    } catch (err) {
        console.error("Greeting generation error:", err);
        return {
            success: false,
            error: "Greeting generation failed: " + (err.message || "Unknown error")
        };
    }
};
