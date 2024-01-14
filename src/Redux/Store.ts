/** @format */

import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import FacilitiesData from "./Features/Facilities/FacilitiesSlice";
import deleteDialog from "./Features/DeleteDialogSlice/DeleteDialogSlice";
import viewDetailsSlice from "./Features/ViewDetails/viewDetailsSlice";
import updateRoomsSlice from "./Features/Rooms/UpdateRoom";
import updateFacilitySlice from "./Features/Facilities/updateFacilitySlice";
import UpdateAdsSlice from "./Features/Ads/UpdateAdsSlice";
import getAdsDetailsSlice from "./Features/Ads/getAdsDetalisSlice";
import roomsDetailsSlice from "./Features/Rooms/RoomDetailsSlice";
import facilityDetailsSlice from "./Features/Facilities/FacilitiesDetailsSlice";
const Store = configureStore({
  reducer: {
    RoomsData,
    FacilitiesData,
    deleteDialog,
    viewDetailsSlice,
    updateRoomsSlice,
    updateFacilitySlice,
    UpdateAdsSlice,
    getAdsDetailsSlice,
    roomsDetailsSlice,
    facilityDetailsSlice,
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
