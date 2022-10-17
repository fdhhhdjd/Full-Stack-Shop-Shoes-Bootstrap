import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AuthenticationSlice from "./authentication_slice/Authentication_Slice";
import Carousels_Slice from "./carousel_slice.js/Carousel_Slice";
import Products_Slice from "./product_slice/Product_Slice";
import Upload_Cloud_Slice from "./upload_slice/Upload_Slice";
const rootReducer = (state, action) => {
  return AuthenticationSlice(state, action);
};
let store;
store = configureStore({
  reducer: {
    auth_user: AuthenticationSlice,
    upload_cloud: Upload_Cloud_Slice,
    carousel_user: Carousels_Slice,
    Products_user: Products_Slice,
    reducer: rootReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
