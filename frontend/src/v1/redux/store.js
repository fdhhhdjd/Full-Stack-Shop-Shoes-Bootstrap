import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AuthenticationSlice from "./authentication_slice/AuthenticationSlice";
import Upload_Cloud_Slice from "./upload_Slice/Upload_Slice";
const rootReducer = (state, action) => {
  if (action.type === "counter/clear") {
    state = undefined;
  }
  return AuthenticationSlice(state, action);
};
let store;
store = configureStore({
  reducer: {
    auth_user: AuthenticationSlice,
    upload_cloud: Upload_Cloud_Slice,
    reducer: rootReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
