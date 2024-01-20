/** @format */
import { configureStore } from "@reduxjs/toolkit";
import changePassword from "./Features/Auth/ChangePasswordSlice";
import ForgetPassword from "./Features/Auth/ForgetPasswordSlice";
import loginReducer from "./Features/Auth/LoginSlice";
import registerReducer from "./Features/Auth/RegisterSlice";
import CreateAdsSlice from "./Features/Ads/CreateAdsSlice";
import CreateRoomsSlice from "./Features/Rooms/CreateRoomsSlice";
const Store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    ForgetPassword,
    changePassword,
    CreateAdsSlice,
    CreateRoomsSlice
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
