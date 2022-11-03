import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_PAYMENT from "../../configs/Apis/Payment_Api/Api_Payment";

export const Get_Detail_User_Payment_Initial = createAsyncThunk(
  "Payment/User",
  async (accessToken, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${API_PAYMENT.API_TOTAL_PAYMENT}`,
        config
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

export const Check_Stock_Product_Initial = createAsyncThunk(
  "Payment/Check/Stock",
  async (accessToken, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${API_PAYMENT.API_CHECK_STOCK_PRODUCT}`,
        config
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

export const Check_Total_Cart_Initial = createAsyncThunk(
  "Payment/Check/total",
  async (accessToken, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${API_PAYMENT.API_TOTAL_PAYMENT}`,
        config
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

export const Transaction_Payment_Initial = createAsyncThunk(
  "Payment/Transaction",
  async ({ accessToken, paymentID, address }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_PAYMENT.API_TRANSACTION_PAYMENT}`,
        { paymentID, address },
        config
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
