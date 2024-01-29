/** @format */

import baseUrl, { requestHeaders } from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const viewUserRoomDetails = createAsyncThunk(
  "viewUserRoom/viewUserRoomDetails",
  async (itemId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.get(`/api/v0/portal/rooms/${itemId}`, {
        headers: {
          Authorization: requestHeaders,
        },
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
        theme: "colored",
      });
      return rejectWithValue(error);
    }
  }
);

const initialState = { data: [], loading: false, error: null };

const viewUserRoomDetailsSlice = createSlice({
  name: "viewUserRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewUserRoomDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        viewUserRoomDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        viewUserRoomDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export default viewUserRoomDetailsSlice.reducer;
