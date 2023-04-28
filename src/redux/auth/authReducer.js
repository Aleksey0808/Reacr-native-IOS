import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    userName: null,
  };

export const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {},
});
