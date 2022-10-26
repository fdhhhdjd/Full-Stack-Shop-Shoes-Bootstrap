import { createSlice } from "@reduxjs/toolkit";
import { Get_Detail_User_Payment_Initial } from "./Api_Redux_Thunk_Payment";
const initialState = {
  loading: false,
  error: null,
  total_user: null,
};
const Payments = createSlice({
  name: "payments",
  initialState,
  reducers: {
    reset_total: (state) => {
      state.total_user = null;
    },
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
  },
});
const Payment_Slice = Payments.reducer;
export const { reset_total } = Payments.actions;
export default Payment_Slice;
