/** @format */

import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import FacilitiesData from "./Features/Facilities/FacilitiesSlice";
import deleteDialog from "./Features/DeleteDialogSlice/DeleteDialogSlice";
import viewDetailsSlice from "./Features/ViewDetails/viewDetailsSlice";

const Store = configureStore({
  reducer: {
    RoomsData,
    FacilitiesData,
    deleteDialog,
    viewDetailsSlice,
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
