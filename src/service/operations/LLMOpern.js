import { llmEndpoints } from "../API";
import axios from "axios";

const {
    GENERATE_SUMMARY_URL
} = llmEndpoints;

export async function generateSummaryAPI(contentId, token) {
    try {
        const response = await axios.post(GENERATE_SUMMARY_URL, {
            contentId: contentId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function askBotAPI(query) {
    try {
        const response = await axios.get(`${llmEndpoints.ASK_BOT_URL}/${encodeURIComponent(query)}`);
        return response;
    } catch (error) {
        throw error;
    }
};