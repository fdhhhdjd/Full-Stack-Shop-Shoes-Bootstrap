import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AuthenticationSlice from "./authentication_slice/Authentication_Slice";
import Carousels_Slice from "./carousel_slice/Carousel_Slice";
import Comment_Slice from "./comment_Slice/Comment_Slice";
import Products_Slice from "./product_slice/Product_Slice";
import Upload_Cloud_Slice from "./upload_Slice/Upload_Slice";
import Cart_Slice from "./cart_slice/Cart_Slice";
import Payment_Slice from "./payment_slice/payment_slice";
import Voucher_Slice from "./voucher_slice/voucher_slice";
import Order_Slice from "./order_slice/order_slice";
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
    Comment_product: Comment_Slice,
    Cart_user: Cart_Slice,
    payment_user: Payment_Slice,
    voucher_user: Voucher_Slice,
    order_user: Order_Slice,
    reducer: rootReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
