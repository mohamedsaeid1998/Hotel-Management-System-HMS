import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/Auth/LoginSlice";
import registerReducer from "./Features/Auth/RegisterSlice";
const Store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});

export default Store;
