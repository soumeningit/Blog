import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchData: null,
    loading: false,
}

export const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setSearchData: (state, action) => {
            state.searchData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});
export default searchSlice.reducer;
export const { setSearchData, setLoading } = searchSlice.actions;