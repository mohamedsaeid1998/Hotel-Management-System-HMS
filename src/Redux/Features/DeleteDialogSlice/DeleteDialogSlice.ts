/** @format */

import baseUrl, { requestHeaders } from "@/utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteDialog = createAsyncThunk(
  "delete/deleteDialog",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.delete(`/api/v0/admin/rooms/${id}`, {
        headers: {
          AuthOrization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDkzNzg3NSwiZXhwIjoxNzA2MTQ3NDc1fQ.EtLEaTRf26ZMtuJILVUeRGIYyRgwGv9NN0rUo6Dj4uY`,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  }
);

const initialState: Props = { data: [], loading: false, error: null };
const deleteItemSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDialog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDialog.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteDialog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default deleteItemSlice.reducer;
