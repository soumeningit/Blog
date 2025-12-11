import { authEndpoints } from "../API";
import axios from "axios";

const {
    SEND_OTP_URL,
    REGISTER_USER_URL,
    LOGIN_USER_URL,
    REQUEST_RESET_PASSWORD_URL,
    RESET_PASSWORD_URL
} = authEndpoints;

export async function sendOtpAPI(data) {
    try {
        const response = await axios.post(SEND_OTP_URL, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function registerUserAPI(data) {
    try {
        const response = await axios.post(REGISTER_USER_URL, data);
        return response;
    } catch (error) {
        throw error;
    }

}

export async function loginUserAPI(data) {
    try {
        const response = await axios.post(LOGIN_USER_URL, data);
        return response;
    } catch (error) {
        throw error;
    }

}

export async function requestResetPasswordAPI(data) {
    try {
        const response = await axios.post(REQUEST_RESET_PASSWORD_URL, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function resetPasswordAPI(data) {
    try {
        const response = await axios.post(RESET_PASSWORD_URL, data);
        return response;
    } catch (error) {
        throw error;
    }
}
