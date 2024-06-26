"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
       toggle: (state) => {
        state.value = !state.value;
      },
    }
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
