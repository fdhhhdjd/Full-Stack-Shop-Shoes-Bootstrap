import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_CART from "../../configs/Apis/Cart_Api/Api_Cart";

export const Add_To_Cart_Initial = createAsyncThunk(
  "Cart/AddToCart",
  async ({ product_id, quantity, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_CART.API_ADD_CART}`,
        {
          product_id,
          quantity,
        },
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

export const Update_Quantity_Cart_Initial = createAsyncThunk(
  "Cart/InDecrement",
  async ({ product_id, quantity, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_CART.API_INCREMENT_DECREASE_CART}`,
        {
          product_id,
          quantity,
        },
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
export const Delete_Cart_Initial = createAsyncThunk(
  "Cart/Delete",
  async ({ product_id, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_CART.API_DELETE_CART}`,
        {
          product_id,
        },
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
export const Get_Detail_User_Cart_Initial = createAsyncThunk(
  "Cart/User/Detail",
  async ({ accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${API_CART.API_DETAIL_USER_CART}`,
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
