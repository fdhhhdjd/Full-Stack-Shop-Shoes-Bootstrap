import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  auth: [],
};
const Authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.auth = [];
    },
  },
  extraReducers: {},
});
const AuthenticationSlice = Authentication.reducer;
export const { reset } = Authentication.actions;
export default AuthenticationSlice;
