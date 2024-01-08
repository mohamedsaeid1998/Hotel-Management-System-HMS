import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/LoginSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default Store;
