import { createSlice } from '@reduxjs/toolkit';
import {
  Change_Password_Users_Initial,
  Forget_Users_Initial,
  Login_Email_Phone_Initial,
  Login_Facebook_Initial,
  Login_Google_Initial,
  Login_Phone_Otp_Initial,
  Logout_Users_Initial,
  New_Accept_Token_Initial,
  Profile_Users_Initial,
  Register_Users_Initial,
  Reset_Users_Initial,
  Update_Info_Users_Initial,
} from './Api_Redux_Thunk';
const initialState = {
  loading: false,
  loading_profile: false,
  error: null,
  error_access: null,
  error_profile: null,
  auth: [],
  auth_changePassword: null,
  accessToken: null,
  profile: null,
  update_users: null,
};
const Authentication = createSlice({
  name: 'Authentication_Users',
  initialState,
  reducers: {
    reset_auth: (state) => {
      state.auth = [];
      state.accessToken = null;
      state.profile = null;
    },
    reset_changePassword: (state) => {
      state.auth_changePassword = null;
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
    //* Forget Password
    [Forget_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Forget_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Forget_Users_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Reset Password
    [Reset_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Reset_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload;
    },
    [Reset_Users_Initial.rejected]: (state, action) => {
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
      state.error_access = action.payload;
    },
    //* Profile Users
    [Profile_Users_Initial.pending]: (state, action) => {
      state.loading_profile = true;
    },
    [Profile_Users_Initial.fulfilled]: (state, action) => {
      state.loading_profile = false;
      state.profile = action.payload.element;
    },
    [Profile_Users_Initial.rejected]: (state, action) => {
      state.loading_profile = false;
      state.error_profile = action.payload;
    },
    //* Upload Profile Users
    [Update_Info_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Update_Info_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.update_users = action.payload.element;
    },
    [Update_Info_Users_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Upload Password Users
    [Change_Password_Users_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Change_Password_Users_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth_changePassword = action.payload.element;
    },
    [Change_Password_Users_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const AuthenticationSlice = Authentication.reducer;
export const { reset_auth, reset_error, reset_changePassword } = Authentication.actions;
export default AuthenticationSlice;
