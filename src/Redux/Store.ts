/** @format */
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Features/Auth/LoginSlice";
import registerReducer from "./Features/Auth/RegisterSlice";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import FacilitiesData from "./Features/Facilities/FacilitiesSlice";
import ForgetPassword from "./Features/Auth/ForgetPasswordSlice";
import changePassword from "./Features/Auth/ChangePasswordSlice";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import FacilitiesData from "./Features/Facilities/FacilitiesSlice";
import deleteDialog from "./Features/DeleteDialogSlice/DeleteDialogSlice";
import viewDetailsSlice from "./Features/ViewDetails/viewDetailsSlice";
import updateRoomsSlice from "./Features/Rooms/UpdateRoom";
import updateFacilitySlice from "./Features/Facilities/updateFacilitySlice";
import UpdateAdsSlice from "./Features/Ads/UpdateAdsSlice";
import getAdsDetailsSlice from "./Features/Ads/getAdsDetalisSlice";
const Store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    ForgetPassword,
    changePassword,
    RoomsData,
    FacilitiesData,
    deleteDialog,
    viewDetailsSlice,
    updateRoomsSlice,
    updateFacilitySlice,
    UpdateAdsSlice,
    getAdsDetailsSlice,
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
