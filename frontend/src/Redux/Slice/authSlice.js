import { createSlice } from "@reduxjs/toolkit";

function getUserFromStorage() {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return null;
    }
}

const initialState = {
    registerData: null,
    user: getUserFromStorage(),
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    loading: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setRegisterData: (state, action) => {
            state.registerData = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setLogOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setRegisterData, setUser, setToken, setLogOut, setLoading } = authSlice.actions;
export default authSlice.reducer;