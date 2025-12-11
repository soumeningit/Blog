require("dotenv").config();
const { OpenRouter } = require("@openrouter/sdk");

async function openrouterInIt() {
    const openrouter = new OpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY
    });
    return openrouter;
}

module.exports = {
    openrouterInIt
};