import { authendpoints } from "../APIRoute";
import axios from "axios";
import { setUser, setToken } from "../../Redux/Slice/authSlice";

const {
    SEND_OTP_API,
    REGISTER_API,
    LOGIN_API,
    FORGOT_PASSWORD_API,
    NEW_PASSWORD_API,
    LOG_OUT_API
} = authendpoints;

export const sendOTP = async (data) => {
    try {
        console.log("Data in sendOTP api ", data);
        const response = await axios.post(SEND_OTP_API, data);
        console.log("OTP Response: ", response);
        return response;
    } catch (e) {
        console.log("Error in sending OTP", e);
    }
}

export const registerUser = async (data) => {
    try {
        const response = await axios.post(REGISTER_API, data);
        return response;
    } catch (e) {
        console.log("Error in registering user", e);
    }
}

export const loginUser = async (data, dispatch) => {
    try {
        const response = await axios.post(LOGIN_API, data);
        if (response.data.success === true) {
            dispatch(setUser(response.data.data.user));
            dispatch(setToken(response.data.data.token));
        }
        return response;
    } catch (e) {
        console.log("Error in logging in user", e);
    }
}

export const forgotPasswordToken = async (data) => {
    try {
        const response = await axios.post(FORGOT_PASSWORD_API, data);
        console.log("Token generated successfully", response.data);
        return response.data;
    } catch (e) {
        console.log("Error in generating token", e);
    }
}

export const resetPassword = async (data) => {
    try {
        const response = await axios.post(NEW_PASSWORD_API, data);
        console.log("Password reset successfully", response.data);
        return response.data;
    } catch (e) {
        console.log("Error in resetting password", e);
    }
}

export const logOutAPI = async (token) => {
    console.log("Token in logout", token);
    try {
        const response = await axios.get(`${LOG_OUT_API}?token=${token}`);
        console.log("Logout response", response);
        return response;
    } catch (e) {
        console.log("Error in logging out", e);
    }
}
