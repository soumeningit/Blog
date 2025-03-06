import { subcategoryendpoints } from "../APIRoute";
import axios from "axios";

const {
    CREATE_SUB_CATEGORY_API,
    GET_SUB_CATEGORIES_BY_CATEGORY_API
} = subcategoryendpoints;

export const getSubCategories = async (token, categoryId) => {
    try {
        const response = await axios.get(`${GET_SUB_CATEGORIES_BY_CATEGORY_API}?category=${categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log("Error in getSubCategories : ", error);
    }
};