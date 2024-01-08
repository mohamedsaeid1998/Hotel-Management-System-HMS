/** @format */

import baseUrl from "../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const RoomsData = createAsyncThunk<any, void>(
  "GetRoomsSlice/RoomsData",
  async () => {
    const data = await baseUrl.get(`/api/v0/admin/rooms?page=1&size=10`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk2ZjliYjYzODg0OGJjZTZlZmIwMjIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDM5MzE4NiwiZXhwIjoxNzA1NjAyNzg2fQ.I5XHfgYureXgFkNQgqGt_xIyzP2Q0Ven8TRy_WRTb4c`,
      },
    });
    return data.data;
  }
);

let initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const GetRoomsSlice = createSlice({
  name: "RoomsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RoomsData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      RoomsData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(RoomsData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default GetRoomsSlice.reducer;
