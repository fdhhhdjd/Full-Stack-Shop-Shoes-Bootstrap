import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_PRODUCT from '../../configs/Apis/Products_Api/Api_Product';

export const Get_All_Product_Initial = createAsyncThunk('Product/Get/All', async () => {
  try {
    const response = await axios.get(`${API_PRODUCT.GET_ALL_PRODUCT}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return error.response.data;
  }
});

export const Get_Detail_Product_Initial = createAsyncThunk('Product/Get/Detail', async (id) => {
  try {
    const response = await axios.get(`${API_PRODUCT.GET_DETAIL_PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return error.response.data;
  }
});
