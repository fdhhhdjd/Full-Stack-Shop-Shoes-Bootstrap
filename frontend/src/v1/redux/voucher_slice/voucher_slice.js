import { createSlice } from "@reduxjs/toolkit";
import {
  Add_Voucher_Initial,
  Del_Voucher_Initial,
} from "./Api_Redux_Thunk_Voucher";
const initialState = {
  loading: false,
  error: null,
  voucher: null,
};
const Vouchers = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    reset_voucher: (state) => {
      state.voucher = null;
    },
    reset_error_voucher: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    //* Add Vouchers
    [Add_Voucher_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Add_Voucher_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.voucher = action.payload.element;
    },
    [Add_Voucher_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
    //* Delete Vouchers
    [Del_Voucher_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Del_Voucher_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.voucher = action.payload.element;
    },
    [Del_Voucher_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.element;
    },
  },
});
const Voucher_Slice = Vouchers.reducer;
export const { reset_voucher, reset_error_voucher } = Vouchers.actions;
export default Voucher_Slice;
