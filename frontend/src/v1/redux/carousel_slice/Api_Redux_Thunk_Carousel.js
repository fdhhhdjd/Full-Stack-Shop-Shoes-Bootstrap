import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_CAROUSEL from "../../configs/Apis/Carousel_Api/Api_Carousel";

export const Get_All_Carousel_Initial = createAsyncThunk(
  "Carousel/Get/All",
  async () => {
    try {
      const response = await axios.get(`${API_CAROUSEL.GET_ALL_CAROUSEL}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return error.response.data;
    }
  }
);
