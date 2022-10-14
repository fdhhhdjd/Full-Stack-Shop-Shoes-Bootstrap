import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_USERS from "../../configs/Apis/User_Api/Api_Users";
import STORAGES from "../../utils/storage";

export const Login_Email_Phone_Initial = createAsyncThunk(
  "Users/Login/Email/Phone",
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_EMAIL_PHONE}`, {
        email_phone: email,
        password,
      });
      STORAGES.saveLocalStorage(
        "accessToken",
        response.data.element.accessToken
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Login_Phone_Otp_Initial = createAsyncThunk(
  "Users/Login/Mobile/Phone",
  async (phone_number, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_PHONE_OTP}`, {
        phone_number: "0" + phone_number.slice(3),
      });
      STORAGES.saveLocalStorage(
        "accessToken",
        response.data.element.accessToken
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Login_Google_Initial = createAsyncThunk(
  "Users/Login/Google",
  async (response_google, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_GOOGLE}`, {
        tokenId: response_google.tokenId,
      });
      STORAGES.saveLocalStorage(
        "accessToken",
        response.data.element.accessToken
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Login_Facebook_Initial = createAsyncThunk(
  "Users/Login/Facebook",
  async (response_facebook, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.LOGIN_FACEBOOK}`, {
        accessToken: response_facebook.accessToken,
        userID: response_facebook.userID,
      });
      STORAGES.saveLocalStorage(
        "accessToken",
        response.data.element.accessToken
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const New_Accept_Token_Initial = createAsyncThunk(
  "Users/New/Accept/Token",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_USERS.NEW_ACCESS_TOKEN}`);
      STORAGES.saveLocalStorage(
        "accessToken",
        response.data.element.accessToken
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Logout_Users_Initial = createAsyncThunk(
  "Users/Logout",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`${API_USERS.LOGOUT_USERS}`, config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Profile_Users_Initial = createAsyncThunk(
  "Users/Profile",
  async (accessToken, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    try {
      const response = await axios.get(`${API_USERS.GET_PROFILE_USER}`, config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Register_Users_Initial = createAsyncThunk(
  "Users/Register",
  async (
    { name, email, password, confirmPassword, date_of_birth, phone_number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_USERS.REGISTER_USERS}`, {
        name,
        email,
        password,
        confirmPassword,
        date_of_birth,
        phone_number,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Forget_Users_Initial = createAsyncThunk(
  "Users/Forget",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_USERS.FORGET_PASSWORD_USERS}`, {
        email,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const Reset_Users_Initial = createAsyncThunk(
  "Users/Reset/Password",
  async ({ token, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_USERS.RESET_PASSWORD_USERS}/${token}`,
        {
          password,
          confirmPassword,
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
