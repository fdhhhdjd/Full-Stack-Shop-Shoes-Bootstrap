import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import CONFIGS from "../configs/config";
import AuthenticationSlice from "./authentication_slice/AuthenticationSlice";
const rootReducer = (state, action) => {
  if (action.type === "counter/clear") {
    state = undefined;
  }
  return AuthenticationSlice(state, action);
};
let store;
if (CONFIGS.NODE_ENV === "development") {
  store = configureStore({
    reducer: {
      auth_user: AuthenticationSlice,
      reducer: rootReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // devTools: process.env.NODE_ENV !== "production",
  });
} else {
  store = configureStore({
    reducer: {
      reducer: rootReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
}

export default store;
