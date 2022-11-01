import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ORDER from "../../configs/Apis/Order_Api/Api_Order";

export const History_Order_Initial = createAsyncThunk(
    "Order/History",
    async (accessToken, { rejectWithValue }) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios.get(
                `${API_ORDER.API_GET_HISTORY}`,
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
export const Detail_History_Order_Initial = createAsyncThunk(
    "Order/History/Detail",
    async ({ id, accessToken }, { rejectWithValue }) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios.get(
                `${API_ORDER.API_DETAIL_ORDER}/${id}`,
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

export const Delete_Flag_History_Order_Initial = createAsyncThunk(
    "Order/History/Delete",
    async ({ id, accessToken }, { rejectWithValue }) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        try {
            const response = await axios.get(
                `${API_ORDER.API_DEL_ORDER_FLAG}/${id}`,
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

