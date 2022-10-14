import { createSlice } from "@reduxjs/toolkit";
import {
  Login_Email_Phone_Initial,
  Login_Facebook_Initial,
  Login_Google_Initial,
  Login_Phone_Otp_Initial,
  Logout_Users_Initial,
  New_Accept_Token_Initial,
  Profile_Users_Initial,
  Register_Users_Initial,
} from "../authentication_slice/Api_Redux_Thunk";
const initialState = {
  loading: false,
  error: null,
  auth: [],
  accessToken: null,
  profile: null,
};
const Authentication = createSlice({
  name: "Authentication_Users",
  initialState,
  reducers: {
    reset_auth: (state) => {
      state.auth = [];
      state.accessToken = null;
      state.profile = null;
    },
    reset_error: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    //* Login Email_Phone have Password
    [Login_Email_Phone_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Email_Phone_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Login_Email_Phone_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Login Phone OTP
    [Login_Phone_Otp_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Phone_Otp_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Login_Phone_Otp_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Login Google
    [Login_Google_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Google_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Login_Google_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //*Register
    [Register_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Register_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Register_Users_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Login Facebook
    [Login_Facebook_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Login_Facebook_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Login_Facebook_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Logout Users
    [Logout_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Logout_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Logout_Users_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* New Accept Token
    [New_Accept_Token_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [New_Accept_Token_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.element.accessToken;
    },
    [New_Accept_Token_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* New Accept Token
    [Profile_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Profile_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload.element;
    },
    [Profile_Users_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth, reset_error } = Authentication.actions;
export default AuthenticationSlice;
