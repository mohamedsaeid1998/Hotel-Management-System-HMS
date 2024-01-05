/** @format */

import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import PutDeleteModalSlice from "./Features/Rooms/PutDeleteModal";

export const store = configureStore({
  reducer: {
    RoomsData,
    PutDeleteModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
