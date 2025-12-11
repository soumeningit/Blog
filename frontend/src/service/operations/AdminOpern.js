import { adminEndpoints } from "../API";
import axios from "axios";

const {
    CREATE_CATEGORY_URL,
    DELETE_CATEGORY_URL,
    CREATE_SUBCATEGORY_URL,
    ADMIN_LOGIN_URL,
    ADMIN_PROFILE_URL,
    ADMIN_POSTS_URL,
    ADMIN_USERS_URL,
    ADMIN_USER_DETAILS_URL
} = adminEndpoints;

export const createCategoryAPI = async (categoryData, token) => {
    try {
        const response = await axios.post(CREATE_CATEGORY_URL, { categories: categoryData }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryAPI = async (categoryId, token) => {
    try {
        const response = await axios.delete(`${DELETE_CATEGORY_URL}/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const createSubCategoryAPI = async (subCategoryData, token) => {
    try {
        const response = await axios.post(CREATE_SUBCATEGORY_URL, subCategoryData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const adminLoginAPI = async (loginData) => {
    try {
        const response = await axios.post(ADMIN_LOGIN_URL, loginData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchAdminProfileAPI = async (token) => {
    try {
        const response = await axios.get(ADMIN_PROFILE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchAdminPostsAPI = async (token, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${ADMIN_POSTS_URL}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const fetchAdminUsersAPI = async (token, page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${ADMIN_USERS_URL}?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function fetchAdminUserDetailsAPI(token, userId) {
    try {
        const response = await axios.get(`${ADMIN_USER_DETAILS_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};