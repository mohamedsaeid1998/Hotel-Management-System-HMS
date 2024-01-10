
import { configureStore } from "@reduxjs/toolkit";
import RoomsData from "./Features/Rooms/GetRoomsSlice"
import FacilitiesData from "./Features/Facilities/FacilitiesSlice"
const Store  = configureStore({
  reducer:{
    RoomsData,
    FacilitiesData
  }
})

export default Store;
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
