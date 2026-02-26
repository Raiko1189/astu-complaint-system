
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API KEY found in .env");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        console.log(`Fetching models from ${url}...`);
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return;
        }

        const data = await response.json();

        console.log("\n--- Writing models to models.json ---");
        fs.writeFileSync("models.json", JSON.stringify(data, null, 2));
        console.log("Done.");

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

listModels();
