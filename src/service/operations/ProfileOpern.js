import { profileEndpoints } from "../API";
import axios from "axios";

const {
    GET_USER_PROFILE_DETAILS_URL,
    UPDATE_PASSWORD_URL,
    UPDATE_PROFILE_PIC_URL,
    UPDATE_USER_PROFILE_URL,
    GET_SAVED_POSTS_URL,
    TOGGLE_SAVE_POST_URL,
    SEARCH_SAVED_POSTS_URL
} = profileEndpoints;

export async function getUserProfileDetailsAPI(token) {
    try {
        const response = await axios.get(GET_USER_PROFILE_DETAILS_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function updateUserPasswordAPI(token, oldPassword, newPassword) {
    try {
        const response = await axios.put(UPDATE_PASSWORD_URL, {
            oldPassword,
            newPassword
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

export async function updateProfilePicAPI(token, data) {
    try {
        const response = await axios.put(UPDATE_PROFILE_PIC_URL, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function updateUserProfileAPI(token, profileData) {
    try {
        const response = await axios.put(UPDATE_USER_PROFILE_URL, profileData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function getSavedPostsAPI(token, page = 1, limit = 10) {
    try {
        const response = await axios.get(`${GET_SAVED_POSTS_URL}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function toggleSavePostAPI(token, postId) {
    try {
        const response = await axios.post(TOGGLE_SAVE_POST_URL, { postId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function searchSavedPostsAPI(token, query, page = 1, limit = 10) {
    try {
        const response = await axios.get(`${SEARCH_SAVED_POSTS_URL}?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};