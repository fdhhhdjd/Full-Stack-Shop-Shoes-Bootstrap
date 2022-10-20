import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_COMMENT from "../../configs/Apis/Comment_Api/Api_Comment";

export const Create_Comment_Initial = createAsyncThunk(
  "Comment/Create",
  async ({ id, rating, comment, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_COMMENT.API_CREATE_COMMENT}/${id}`,
        {
          rating,
          comment,
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

export const Update_Comment_Initial = createAsyncThunk(
  "Comment/Update",
  async (
    { productId, commentId, comment, accessToken },
    { rejectWithValue }
  ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_COMMENT.API_UPDATE_COMMENT}/${productId}/update/${commentId}`,
        {
          comment,
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

export const Delete_Comment_Initial = createAsyncThunk(
  "Comment/Delete",
  async ({ productId, commentId, accessToken }, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.delete(
        `${API_COMMENT.API_DELETE_COMMENT}/${productId}/delete/${commentId}`,
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
