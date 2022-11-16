import { createSlice } from '@reduxjs/toolkit';
import { Get_All_Carousel_Initial } from './Api_Redux_Thunk_Carousel';
const initialState = {
  loading: false,
  error: null,
  result_carousel: null,
};
const Carousels = createSlice({
  name: 'carousels',
  initialState,
  reducers: {
    reset_carousel: (state) => {
      state.result_carousel = null;
    },
  },
  extraReducers: {
    //* Get All Carousel
    [Get_All_Carousel_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Get_All_Carousel_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.result_carousel = action.payload.element.carousels;
    },
    [Get_All_Carousel_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Carousels_Slice = Carousels.reducer;
export const { reset_carousel } = Carousels.actions;
export default Carousels_Slice;
