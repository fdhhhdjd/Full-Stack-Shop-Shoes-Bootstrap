import { createSlice } from "@reduxjs/toolkit";
import {
    Send_FeedBack_Initial,
} from "./Api_Redux_Thunk_Feedback";
const initialState = {
    loading: false,
    error: null,
    feedback_data: null
};
const Feedback_User = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        reset_feedback: (state) => {
            state.feedback_data = null;
        }
    },
    extraReducers: {
        //* Seen Feedback
        [Send_FeedBack_Initial.pending]: (state, action) => {
            state.loading = true;
        },
        [Send_FeedBack_Initial.fulfilled]: (state, action) => {
            state.loading = false;
            state.feedback_data = action.payload.element;
        },
        [Send_FeedBack_Initial.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
const Feedback_Slice = Feedback_User.reducer;
export const { reset_feedback } = Feedback_User.actions;
export default Feedback_Slice;
