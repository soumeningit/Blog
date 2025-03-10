import { profileendpoints } from '../APIRoute';
import axios from 'axios';

const {
    GET_BOOKMARKED_ITEMS_API,
    UPDATE_IMAGE_API,
    UPDATE_PROFILE_API,
    UPDATE_SOCIAL_LINKS_API
} = profileendpoints;

export const getBookMarkedItemsAPI = async (token, userId) => {
    try {
        const response = await axios.get(`${GET_BOOKMARKED_ITEMS_API}?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log("GET BOOKMARKED ITEMS API ERROR: ", error);
        return error;
    }
};

export const updateImageAPI = async (formData, token) => {
    try {
        const response = await axios.post(UPDATE_IMAGE_API, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.log("UPDATE IMAGE API ERROR: ", error);
        return error;
    }
};

export const updateProfileAPI = async (data, token) => {
    try {
        const response = await axios.post(UPDATE_PROFILE_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log("UPDATE PROFILE API ERROR: ", error);
        return error;
    }
};

export const updateSocialLinksAPI = async (data, token) => {
    try {
        const response = await axios.post(UPDATE_SOCIAL_LINKS_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log("UPDATE SOCIAL LINKS API ERROR: ", error);
        return error;
    }
}

