import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice";
import searchSlice from "./Slice/searchSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        search: searchSlice
    }
});