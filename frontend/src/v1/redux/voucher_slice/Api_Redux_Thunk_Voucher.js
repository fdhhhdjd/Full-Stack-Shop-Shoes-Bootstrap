import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_VOUCHER from "../../configs/Apis/Voucher_Api/Api_Voucher";

export const Add_Voucher_Initial = createAsyncThunk(
  "Voucher/Add",
  async ({ title, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_VOUCHER.API_ADD_VOUCHER}`,
        { title },
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
export const Del_Voucher_Initial = createAsyncThunk(
  "Voucher/Del",
  async (accessToken, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${API_VOUCHER.API_DEL_VOUCHER}`,
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
