import { createSlice } from "@reduxjs/toolkit";
import {
  Get_Detail_User_Payment_Initial, Check_Stock_Product_Initial, Check_Total_Cart_Initial,
  Transaction_Payment_Initial, Transaction_Payment_Stripe_Initial
} from "./Api_Redux_Thunk_Payment";
const initialState = {
  loading: false,
  error: null,
  total_user: null,
  total_payment: null,
  transaction: null,
  stock_transaction: null,
  transaction_stripe: null
};
const Payments = createSlice({
  name: "payments",
  initialState,
  reducers: {
    reset_total: (state) => {
      state.total_user = null
    },
    reset_payment: (state) => {
      state.total_user = null
      state.total_payment = null
      state.transaction = null
      state.transaction_stripe = null
      state.stock_transaction = null
    },
    reset_stock_transaction: (state) => {
      state.stock_transaction = null
      state.total_payment = null
    }
  },
  extraReducers: {
    //* Payment UserId
    [Get_Detail_User_Payment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_User_Payment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.total_user = action.payload.element;
    },
    [Get_Detail_User_Payment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Payment CheckStock
    [Check_Stock_Product_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Check_Stock_Product_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.stock_transaction = action.payload.element;
    },
    [Check_Stock_Product_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
    //* Payment Check Total
    [Check_Total_Cart_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Check_Total_Cart_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.total_payment = action.payload.element;
    },
    [Check_Total_Cart_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Transaction Payment Paypal
    [Transaction_Payment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Transaction_Payment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.transaction = action.payload.element;
    },
    [Transaction_Payment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Transaction Payment Paypal
    [Transaction_Payment_Stripe_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Transaction_Payment_Stripe_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.transaction_stripe = action.payload.element;
    },
    [Transaction_Payment_Stripe_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Payment_Slice = Payments.reducer;
export const { reset_payment, reset_stock_transaction, reset_total } = Payments.actions;
export default Payment_Slice;
