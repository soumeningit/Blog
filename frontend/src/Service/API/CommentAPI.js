import axios from "axios";
import { commentendpoints } from "../APIRoute";

const {
    CREATE_COMMENT_API,
    CREATE_REPLY_API
} = commentendpoints;

export const addCommentAPI = async (data, token) => {
    try {
        const response = await axios.post(CREATE_COMMENT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const addReplyAPI = async (data, token) => {
    try {
        const response = await axios.post(CREATE_REPLY_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
};