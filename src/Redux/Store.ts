import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/Auth/LoginSlice";
import registerReducer from "./Features/Auth/RegisterSlice";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import FacilitiesData from "./Features/Facilities/FacilitiesSlice";
import ForgetPassword from "./Features/Auth/ForgetPasswordSlice";
import changePassword from "./Features/Auth/ChangePasswordSlice";

const Store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    ForgetPassword,
    changePassword,
    RoomsData,
    FacilitiesData,
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
