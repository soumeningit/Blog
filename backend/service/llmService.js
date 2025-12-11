const { openrouterInIt } = require("../config/llmConfig");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

async function generateSummary(content) {
    try {
        const openrouter = await openrouterInIt();

        const stream = await openrouter.chat.send({
            model: "openai/gpt-oss-20b:free",
            messages: [
                {
                    role: "user",
                    content: `Summarize this in 3-4 lines:\n\n${content}`
                }
            ],
            stream: true,
            streamOptions: {
                includeUsage: true
            }
        });

        let fullResponse = "";

        for await (const chunk of stream) {

            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
                fullResponse += delta;
                process.stdout.write(delta);
            }

            if (chunk.usage) {
                console.log("\nReasoning tokens:", chunk.usage.reasoningTokens);
            }
        }

        return {
            success: true,
            summary: fullResponse.trim()
        };

    } catch (error) {
        console.error("Error generating summary:", error);
        return {
            success: false,
            message: "Failed to generate summary",
            error: error.message
        };
    }
};

async function askBot(query) {
    try {
        const guidePath = path.join(__dirname, "../data/appGuide.md");
        const guide = fs.readFileSync(guidePath, "utf-8");
        const openrouter = await openrouterInIt();
        const response = await openrouter.chat.send({
            model: "openai/gpt-oss-20b:free",
            messages: [
                {
                    role: "system",
                    content: `
You are a support bot for a blog application.
Answer ONLY using the provided app documentation.
If the answer is not in the documentation, reply:
"I don't have information about that yet."

Documentation:
${guide}
`
                },
                {
                    role: "user",
                    content: query
                }
            ]
        });

        return {
            success: true,
            answer: response.choices[0].message.content
        }
    } catch (error) {
        console.error("Error in askBot:", error);
        return {
            success: false,
            message: "Failed to get response from bot",
            error: error.message
        };
    }
}

module.exports = { generateSummary, askBot };
