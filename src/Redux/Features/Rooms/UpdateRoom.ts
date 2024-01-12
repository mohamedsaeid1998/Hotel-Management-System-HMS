/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl, { requestHeaders } from "../../../utils/Custom/Custom";

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
            Authorization: requestHeaders,
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
