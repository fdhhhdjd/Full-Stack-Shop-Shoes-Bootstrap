import { createSlice } from "@reduxjs/toolkit";
import {
  Destroy_Cloud_Initial,
  Upload_Cloud_Initial,
} from "../upload_Slice/Api_Redux_Thunk_Upload";
const initialState = {
  loading: false,
  error: null,
  result: null,
  result_destroy: null,
};
const Upload_Cloud = createSlice({
  name: "Upload_Cloud",
  initialState,
  reducers: {
    reset_upload: (state) => {
      state.result = null;
    },
  },
  extraReducers: {
    //* Upload Cloud
    [Upload_Cloud_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Upload_Cloud_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.result = action.payload.element;
    },
    [Upload_Cloud_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Destroy Cloud
    [Destroy_Cloud_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Destroy_Cloud_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.result_destroy = action.payload;
    },
    [Destroy_Cloud_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Upload_Cloud_Slice = Upload_Cloud.reducer;
export const { reset_upload } = Upload_Cloud.actions;
export default Upload_Cloud_Slice;
