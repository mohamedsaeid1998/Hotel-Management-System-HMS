/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const updateRoomData = createAsyncThunk<any, void>(
  "updateRooms/updateRoomData",
  async (
    { roomNumber, price, capacity, discount, facilities, images, id },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await baseUrl.put(
        `/api/v0/admin/rooms/${id}`,
        {
          roomNumber,
          price,
          capacity,
          discount,
          facilities,
          imgs: images[0],
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNTAyMzM4MCwiZXhwIjoxNzA2MjMyOTgwfQ.LHYpgolymLf-6wSm_FeruZN-IQxSyM7WCw3smi37DeE`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

export const updateRoomsSlice = createSlice({
  name: "updateRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateRoomData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateRoomData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      updateRoomData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default updateRoomsSlice.reducer;
