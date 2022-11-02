import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_FEED_BACK from "../../configs/Apis/Feedback_Api/Api_Feedback";

export const Send_FeedBack_Initial = createAsyncThunk(
    "FeedBack/Send",
    async ({ fullname, email, content, subject }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_FEED_BACK.API_SEND_FEED_BACK}`,
                {
                    fullname, email, content, subject
                },
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