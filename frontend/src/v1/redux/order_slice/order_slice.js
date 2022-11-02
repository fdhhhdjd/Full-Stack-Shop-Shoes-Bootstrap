import { createSlice } from "@reduxjs/toolkit";
import {
    Delete_Flag_History_Order_Initial,
    Detail_History_Order_Initial, History_Order_Initial
} from "./Api_Redux_Thunk_Order";
const initialState = {
    loading: false,
    error: null,
    order: null,
    order_detail: null,
    order_delete: null
};
const Orders = createSlice({
    name: "orders",
    initialState,
    reducers: {
        reset_order: (state) => {
            state.order = null;
        },
        reset_order_delete: (state) => {
            state.order_delete = null;
        },
        reset_order_detail: (state) => {
            state.order_detail = null;
        }
    },
    extraReducers: {
        //* History order
        [History_Order_Initial.pending]: (state, action) => {
            state.loading = true;
        },
        [History_Order_Initial.fulfilled]: (state, action) => {
            state.loading = false;
            state.order = action.payload.element;
        },
        [History_Order_Initial.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.element;
        },
        //* Delete Flag order
        [Delete_Flag_History_Order_Initial.pending]: (state, action) => {
            state.loading = true;
        },
        [Delete_Flag_History_Order_Initial.fulfilled]: (state, action) => {
            state.loading = false;
            state.order_delete = action.payload.element;
        },
        [Delete_Flag_History_Order_Initial.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.element;
        },
        //* Detail orders
        [Detail_History_Order_Initial.pending]: (state, action) => {
            state.loading = true;
        },
        [Detail_History_Order_Initial.fulfilled]: (state, action) => {
            state.loading = false;
            state.order_detail = action.payload.element.payment;
        },
        [Detail_History_Order_Initial.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.element;
        },
    },
});
const Order_Slice = Orders.reducer;
export const { reset_order, reset_order_delete, reset_order_detail } = Orders.actions;
export default Order_Slice;
