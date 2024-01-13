/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const CreateAds = createAsyncThunk<any, void>(
  "CreateAdsSlice/CreateAds",
  async ({ room, discount, isActive, id }: any) => {
    const response = await baseUrl.put(
      `/api/v0/admin/ads/${id}`,
      {
        room,
        discount,
        isActive,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const CreateAdsSlice = createSlice({
  name: "CreateFacility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateAds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      CreateAds.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(CreateAds.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default CreateAdsSlice.reducer;
