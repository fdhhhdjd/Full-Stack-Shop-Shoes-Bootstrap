import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_UPLOAD from '../../configs/Apis/Upload_Api/Api_Upload';

export const Upload_Cloud_Initial = createAsyncThunk(
  'Upload/Image/Cloud',
  async ({ formData, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(`${API_UPLOAD.UPLOAD_IMAGE_CLOUD}`, formData, config);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const Destroy_Cloud_Initial = createAsyncThunk(
  'Destroy/Image/Cloud',
  async ({ public_id, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_UPLOAD.DESTROY_IMAGE_CLOUD}`,
        {
          public_id,
        },
        config,
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);
