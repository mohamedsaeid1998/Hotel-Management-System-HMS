/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
// async()=>{
//   const data =await baseUrl.delete(q)
// }
export const deleteRoom = createAsyncThunk<any, void>(
  "room/deleteRoom",
  async (id) => {
    const response = axios.delete(
      `http://154.41.228.234:3000/api/v0/admin/rooms/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDc2MTE1MiwiZXhwIjoxNzA1OTcwNzUyfQ.AMLcyWQ4Cv3fNEAeKEA-Ovo75Z3Ef2hqKobN2zQvgJw`,
        },
      }
    );
    console.log(response);
    return response;
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const deleteRoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default deleteRoomSlice.reducer;
