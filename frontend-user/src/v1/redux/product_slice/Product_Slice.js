import { createSlice } from '@reduxjs/toolkit';
import { Get_All_Product_Initial, Get_Detail_Product_Initial } from './Api_Redux_Thunk_Products';
const initialState = {
  loading: false,
  error: null,
  result_product: null,
  result_product_detail: null,
};
const Products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset_product: (state) => {
      state.result_product = null;
    },
    reset_product_detail: (state) => {
      state.result_product_detail = null;
    },
  },
  extraReducers: {
    //* Get All Product
    [Get_All_Product_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Product_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.result_product = action.payload.element;
    },
    [Get_All_Product_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Get Detail Product
    [Get_Detail_Product_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_Detail_Product_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.result_product_detail = action.payload.element;
    },
    [Get_Detail_Product_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Product_Slice = Products.reducer;
export const { reset_product, reset_product_detail } = Products.actions;
export default Product_Slice;
