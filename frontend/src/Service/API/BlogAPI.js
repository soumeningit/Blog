import { blogendpoints } from "../APIRoute";
import axios from "axios";

const {
    CREATE_BLOG_API,
    GET_ALL_BLOGS_API,
    GET_BLOG_BY_ID_API,
    GET_BLOG_BY_USER_ID_API,
    ADD_LIKE_API,
    REMOVE_LIKE_API,
    ADD_BOOKMARK_API,
    REMOVE_BOOKMARK_API,
    THUMBNAIL_UPLOAD_API,
    DELETE_BLOG_API,
    GET_BLOGS_BY_CATEGORY_API,
    EDIT_BLOG_API
} = blogendpoints;

export const createBlogAPI = async (contentDetails, token) => {
    try {
        const response = await axios.post(CREATE_BLOG_API, contentDetails,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getAllBlogsAPI = async () => {
    try {
        const response = await axios.get(GET_ALL_BLOGS_API);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBlogByIdAPI = async (id) => {
    try {
        const response = await axios.get(`${GET_BLOG_BY_ID_API}?id=${id}`);
        return response
    } catch (error) {
        console.log(error);
    }
};

export const getBlogByUserIdAPI = async (userId, token) => {
    try {
        const response = await axios.get(`${GET_BLOG_BY_USER_ID_API}?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addLikeAPI = async (data, token) => {
    try {
        const response = await axios.post(ADD_LIKE_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const removeLikeAPI = async (data, token) => {
    try {
        const response = await axios.post(REMOVE_LIKE_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addBookMarkAPI = async (data, token) => {
    try {
        const response = await axios.post(ADD_BOOKMARK_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const removeBookMarkAPI = async (data, token) => {
    try {
        const response = await axios.post(REMOVE_BOOKMARK_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const thumbnailUploadAPI = async (data, token) => {
    try {
        const response = await axios.post(THUMBNAIL_UPLOAD_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteBlogAPI = async (data, token) => {
    try {
        const response = await axios.post(DELETE_BLOG_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBlogsByCategoryAPI = async (id) => {
    try {
        const response = await axios.get(`${GET_BLOGS_BY_CATEGORY_API}?categoryId=${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editBlogAPI = async (data, token) => {
    try {
        const response = await axios.post(EDIT_BLOG_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw new Error(error)
    }
}