import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_AUTH from "../../configs/api/authentication";
//* Login
export const LoginInitial = createAsyncThunk(
  "User/Login/Email/Phone",
  async ({ email_phone, password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_AUTH.login_user_phone}`, {
        email_phone,
        password,
        token,
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
//* Social
export const LoginGoogleInitial = createAsyncThunk(
  "User/Login/Google",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_AUTH.login_user_google}`, {
        tokenId,
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const LoginFacebookInitial = createAsyncThunk(
  "User/Login/Facebook",
  async (response_data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_AUTH.login_user_facebook}`, {
        userID: response_data.userID,
        accessToken: response_data.accessToken,
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

//* New token
export const NewAcceptTokenInitiate = createAsyncThunk(
  "User/new/AcceptToken",
  async () => {
    const response = await axios.get(`${API_AUTH.new_access_token}`);
    return response.data;
  }
);
//* Logout
export const LogoutInitiate = createAsyncThunk(
  "User/Logout",
  async ({ token }) => {
    const response = await axios.get(`${API_AUTH.logout}`, {
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  }
);
//* Profile
export const ProfileInitiate = createAsyncThunk(
  "User/Profile/Users",
  async ({ token }) => {
    const response = await axios.get(`${API_AUTH.profile_user}`, {
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  }
);
