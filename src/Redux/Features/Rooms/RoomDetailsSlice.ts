/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const RoomsDataDetails = createAsyncThunk<any, void>(
  "roomDetails/RoomsDataDetails",
  async (roomId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(roomId);
    try {
      const data = await baseUrl.get(`/api/v0/admin/rooms/${roomId}`, {
        headers: {
          Authorization: token,
        },
      });
      return data.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const roomsDetailsSlice = createSlice({
  name: "roomDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RoomsDataDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      RoomsDataDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      RoomsDataDetails.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default roomsDetailsSlice.reducer;