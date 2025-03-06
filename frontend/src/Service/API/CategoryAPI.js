import { categoryendpoints } from "../APIRoute";
import axios from "axios";

const {
    GET_CATEGORIES_API,
    CREATE_CATEGORY_API
} = categoryendpoints;

export const getCategories = async (token) => {
    try {
        console.log("Inside getCategories API ", token);
        const response = await axios.get(GET_CATEGORIES_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log("Error in getCategories : ", error);
    }
};