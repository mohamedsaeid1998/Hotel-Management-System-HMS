
import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice"
import FacilitiesData from "./Features/Facilities/FacilitiesSlice"
export const store  = configureStore({
  reducer:{
    RoomsData,
    FacilitiesData
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
