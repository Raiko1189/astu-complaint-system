import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

import { chunkText } from "../../utils/chunk.js";
import { getGeminiEmbedding } from "../../utils/embedData.js";
import { Data } from "../../model/db.js";
import mammoth from "mammoth";

export const uploadDataService = {
    async upload(text) {
        if (!text || !text.trim()) {
            return { success: false, error: "Text content is empty" };
        }
        return await this.processTextAndSave(text);
    },

    async uploadFile(file) {
        try {
            let text = "";
            const mimetype = file.mimetype;

            if (mimetype === "application/pdf") {
                const data = await pdf(file.buffer);
                text = data.text;
            } else if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                const result = await mammoth.extractRawText({ buffer: file.buffer });
                text = result.value;
            } else if (mimetype === "text/plain") {
                text = file.buffer.toString("utf-8");
            } else {
                return { success: false, error: "Unsupported file type" };
            }

            if (!text || !text.trim()) {
                return { success: false, error: "Extracted text is empty" };
            }

            return await this.processTextAndSave(text);

        } catch (error) {
            console.error("File Upload Error:", error);
            return {
                success: false,
                error: `File processing failed: ${error.message}`
            };
        }
    },

    async processTextAndSave(text) {
        try {
            const chunks = await chunkText(text);
            if (!chunks || chunks.length === 0) {
                return { success: false, error: "Text could not be split into chunks" };
            }

            const embeddingResult = await getGeminiEmbedding(chunks, true);
            if (!embeddingResult.success) {
                return {
                    success: false,
                    error: embeddingResult.error || "Gemini embedding failed"
                };
            }

            const documents = chunks.map((chunk, index) => ({
                content: chunk,
                embedding: embeddingResult.data[index]
            }));

            const savedData = await Data.insertMany(documents);

            return {
                success: true,
                data: {
                    count: savedData.length,
                    message: "Successfully embedded and saved data"
                }
            };
        } catch (error) {
            console.error("Database/Embedding Error:", error);
            return { success: false, error: error.message };
        }
    },

    async getAllData() {
        try {
            // Limit to last 50 items to avoid payload issues
            const data = await Data.find().sort({ createdAt: -1 }).limit(50);
            return { success: true, data };
        } catch (error) {
            console.error("Get All Data Error:", error);
            return { success: false, error: error.message };
        }
    }
};
