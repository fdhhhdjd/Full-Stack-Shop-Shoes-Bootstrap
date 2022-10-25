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
