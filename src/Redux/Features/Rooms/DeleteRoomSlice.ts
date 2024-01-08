/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
// async()=>{
//   const data =await baseUrl.delete(q)
// }
export const deleteRoom = createAsyncThunk<any, void>(
  "deleteRoomSlice/deleteRoom",
  async (id) => {
    try {
      await baseUrl.delete(`/api/v0/admin/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDcyMTE0OCwiZXhwIjoxNzA1OTMwNzQ4fQ.aSmJBNCztf09cMAmhqjq1vHD6KswyFFX1aJ8B6BvBDI`,
        },
      });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const deleteRoomSlice = createSlice({
  name: "deleteRoom",
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
        state.data = state.data.filter((el) => el.id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        console.log(state);

        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default deleteRoomSlice.reducer;
