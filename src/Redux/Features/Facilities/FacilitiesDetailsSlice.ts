/** @format */

import baseUrl from "../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const facilitiesDataDetails = createAsyncThunk<any, void>(
  "facilityDetails/facilitiesData",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await baseUrl.get(`/api/v0/admin/room-facilities/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return data.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const getFacilityDetailsSlice = createSlice({
  name: "facilityDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(facilitiesDataDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      facilitiesDataDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      facilitiesDataDetails.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default getFacilityDetailsSlice.reducer;
