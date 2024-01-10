/** @format */

import baseUrl from "@/utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface Props {
  data: [];
  loading: boolean;
  error: null | string;
}

export const popupFeatures = createAsyncThunk<any, void>(
  "popup/popupFeatures",
  async (id) => {
    const response = baseUrl.delete(
      `http://154.41.228.234:3000/api/v0/admin/rooms/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDc2MTE1MiwiZXhwIjoxNzA1OTcwNzUyfQ.AMLcyWQ4Cv3fNEAeKEA-Ovo75Z3Ef2hqKobN2zQvgJw`,
        },
      }
    );
    console.log(response);
    return response;
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const PopupFeatureSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(popupFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(popupFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(popupFeatures.rejected, (state) => {
        state.loading = false;
        // state.error = action.error;
      });
  },
});

export default PopupFeatureSlice.reducer;
