import axios from "axios";
import { searchendpoints } from "../APIRoute";

const {
    SEARCH_API
} = searchendpoints;

export const searchDataAPI = async (searchQuery) => {
    console.log("Search Query : ", searchQuery);
    try {
        const response = await axios.post(SEARCH_API, { query: searchQuery });
        return response;
    } catch (error) {
        console.log("Error in searchAPI : ", error);
    }
}