import { createSlice } from '@reduxjs/toolkit';
import {
  Create_Comment_Initial,
  Update_Comment_Initial,
  Delete_Comment_Initial,
  Detail_Profile_Account_Comment_Initial,
} from './Api_Redux_Thunk_Comment';
const initialState = {
  loading: false,
  error: null,
  reviews: null,
  review_edit: null,
  review_profile: null,
};
const Comment_Product = createSlice({
  name: 'Comment',
  initialState,
  reducers: {
    reset_review: (state) => {
      state.reviews = null;
      state.review_edit = null;
    },
    reset_review_error: (state) => {
      state.error = null;
    },
    reset_profile_account: (state) => {
      state.review_profile = null;
    },
  },
  extraReducers: {
    //* Create Comment
    [Create_Comment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Comment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.element;
    },
    [Create_Comment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Update Comment
    [Update_Comment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Update_Comment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.review_edit = action.payload.element;
    },
    [Update_Comment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Delete Comment
    [Delete_Comment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Delete_Comment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.element;
    },
    [Delete_Comment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //* Profile account Comment
    [Detail_Profile_Account_Comment_Initial.pending]: (state, action) => {
      state.loading = true;
    },
    [Detail_Profile_Account_Comment_Initial.fulfilled]: (state, action) => {
      state.loading = false;
      state.review_profile = action.payload.element;
    },
    [Detail_Profile_Account_Comment_Initial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Comment_Slice = Comment_Product.reducer;
export const { reset_review, reset_review_error, reset_profile_account } = Comment_Product.actions;
export default Comment_Slice;
