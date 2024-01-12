/** @format */

import baseUrl, { requestHeaders } from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const viewRoomDetails = createAsyncThunk(
  "view/viewRoomDetails",
  async (itemId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.get(`/api/v0/admin/rooms/${itemId}`, {
        headers: {
          Authorization: requestHeaders,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = { data: [], loading: false, error: null };

const viewDetailsSlice = createSlice({
  name: "view",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewRoomDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        viewRoomDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        viewRoomDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export default viewDetailsSlice.reducer;
