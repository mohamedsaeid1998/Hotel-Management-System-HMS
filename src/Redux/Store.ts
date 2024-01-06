/** @format */

import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice";
import DeleteRoomSlice from "./Features/Rooms/DeleteRoomSlice";

export const store = configureStore({
  reducer: {
    RoomsData,
    DeleteRoomSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
