import { createSlice } from '@reduxjs/toolkit';
import {
  Add_To_Cart_Initial,
  Decrement_Quantity_Cart_Initial,
  Increment_Quantity_Cart_Initial,
  Delete_Cart_Initial,
  Get_Detail_User_Cart_Initial,
} from './Api_Redux_Thunk_Cart';
const initialState = {
  loading: false,
  error: null,
  cart: null,
  change_cart: null,
  total_quantity: 0,
};
const Cart_User = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    reset_cart: (state) => {
      state.cart = null;
      state.total_quantity = null;
    },
    reset_change_cart: (state) => {
      state.change_cart = null;
    },
    reset_change_error: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    //* Add To Cart
    [Add_To_Cart_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Add_To_Cart_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.change_cart = action.payload;
    },
    [Add_To_Cart_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
    //* Increment Quantity Cart
    [Increment_Quantity_Cart_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Increment_Quantity_Cart_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.change_cart = action.payload;
    },
    [Increment_Quantity_Cart_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
    //* Decrement Quantity Cart
    [Decrement_Quantity_Cart_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Decrement_Quantity_Cart_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.change_cart = action.payload;
    },
    [Decrement_Quantity_Cart_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
    //* Delete Cart
    [Delete_Cart_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete_Cart_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.change_cart = action.payload;
    },
    [Delete_Cart_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
    //* Get Cart Users
    [Get_Detail_User_Cart_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_User_Cart_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload.element.product;
      state.total_quantity = action.payload.element;
    },
    [Get_Detail_User_Cart_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Cart_Slice = Cart_User.reducer;
export const { reset_cart, reset_change_cart, reset_change_error } = Cart_User.actions;
export default Cart_Slice;
