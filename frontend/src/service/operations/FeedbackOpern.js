import { feedbackEndpoints } from "../API";
import axios from "axios";

const {
    CONTACT_US_URL
} = feedbackEndpoints;

export async function contactusAPI(data, token) {
    try {
        const response = axios.post(CONTACT_US_URL, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}