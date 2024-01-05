/** @format */

import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import DeleteModal from "./Features/Rooms/DeleteModal";

export const store = configureStore({
  reducer: {
    RoomsData,
    DeleteModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
