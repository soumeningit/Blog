import { generalEndpoints } from "../API";
import axios from "axios";

const {
    GET_ALL_CATEGORIES_URL,
    GET_BLOGS_URL,
    GET_BLOG_BY_ID_URL,
    SET_VIEWS_URL,
    GET_HOME_PAGE_DATA_URL,
    SEARCH_POSTS_URL,
    SUBSCRIBE_FROM_CTA_URL,
    SUBSCRIBE_FROM_CTA_NEXT_URL
} = generalEndpoints;

export const getAllCategoriesAPI = async () => {
    try {
        const response = await axios.get(GET_ALL_CATEGORIES_URL);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getBlogPostsAPI = async () => {
    try {
        const response = await axios.get(GET_BLOGS_URL);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getBlogByIdAPI = async (blogId, userId = null) => {
    try {
        const response = await axios.get(`${GET_BLOG_BY_ID_URL}?id=${blogId}&userId=${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const setViewsAPI = async (postId) => {
    try {
        const response = await axios.post(SET_VIEWS_URL, { postId });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getHomePageDataAPI = async () => {
    try {
        const response = await axios.get(GET_HOME_PAGE_DATA_URL);
        return response;
    } catch (error) {
        throw error;
    }
}

export const searchPostsAPI = async (query) => {
    try {
        const response = await axios.get(`${SEARCH_POSTS_URL}?q=${encodeURIComponent(query)}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const subscribeFromctaAPI = async (email) => {
    try {
        const response = await axios.post(SUBSCRIBE_FROM_CTA_URL, { email });
        return response;
    } catch (error) {
        throw error;
    }
}

export const subscribeFromctaNextAPI = async (data) => {
    try {
        const response = await axios.post(SUBSCRIBE_FROM_CTA_NEXT_URL, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateBlogAPI = async () => { }
export const uploadImageAPI = async () => { }