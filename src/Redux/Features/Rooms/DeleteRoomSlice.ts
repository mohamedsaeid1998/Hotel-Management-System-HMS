/** @format */

import baseUrl from "../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const deleteRoom = createAsyncThunk<any, void>(
  "DeleteRoomSlice/deleteRoom",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`/api/v0/admin/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDU1MzUxNSwiZXhwIjoxNzA1NzYzMTE1fQ.8YscMRj6Q4dJuLCWKlvl6O5zwUhZuseHeSP-P1F2n08`,
        },
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const DeleteRoomSlice = createSlice({
  name: "deleteRoom",
  initialState,
  reducers: {},
  extraReducers: {
    [deleteRoom.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deleteRoom.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.fliter((el) => el.id !== action.payload);
    },
    [deleteRoom.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default DeleteRoomSlice.reducer;
