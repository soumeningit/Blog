import { contentEndpoints } from "../API";
import axios from "axios";

const {
    CREATE_BLOG_URL,
    SAVE_BLOG_URL,
    CREATE_COMMENT_URL,
    LIKE_POST_URL,
    SAVE_POST_URL,
    FOLLOW_AUTHOR_URL,
    GET_POSTS_BY_AUTHOR_URL,
    GET_SUB_CATEGORIES_URL,
    EDIT_CONTENT_POST_URL,
    FILE_UPLOAD_URL,
    UPGRADE_ROLE_URL
} = contentEndpoints;

export async function createBlogAPI(token, data) {
    try {
        // Let the browser/axios set the Content-Type with proper boundary for FormData
        const response = await axios.post(CREATE_BLOG_URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export async function saveBlogAPI(token, blogData) {
    try {
        const response = await axios.post(SAVE_BLOG_URL, blogData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createCommentAPI(token, commentData) {
    try {
        const response = await axios.post(CREATE_COMMENT_URL, commentData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function likePostAPI(token, likeData) {
    try {
        const response = await axios.post(LIKE_POST_URL, likeData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function savePostAPI(token, postData) {
    try {
        const response = await axios.post(SAVE_POST_URL, postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function followAuthorAPI(token, authorData) {
    try {
        const response = await axios.post(FOLLOW_AUTHOR_URL, authorData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function getPostsByAuthorAPI(token, page = 1, limit = 10) {
    try {
        const response = await axios.get(`${GET_POSTS_BY_AUTHOR_URL}?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getSubCategoriesAPI(token, category) {
    try {
        const response = await axios.get(`${GET_SUB_CATEGORIES_URL}?category=${category}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function editContentPostAPI(token, postData, postId) {
    try {
        const response = await axios.put(`${EDIT_CONTENT_POST_URL}/${postId}`, postData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function fileUploadAPI(token, fileData) {
    try {
        const response = await axios.post(FILE_UPLOAD_URL, fileData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function upgradeRoleAPI(token, email) {
    try {
        const response = await axios.put(UPGRADE_ROLE_URL, { email }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}