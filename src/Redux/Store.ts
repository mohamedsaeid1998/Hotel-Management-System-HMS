
import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice"
export const store  = configureStore({
  reducer:{
    RoomsData
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
