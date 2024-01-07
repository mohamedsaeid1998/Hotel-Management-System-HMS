import baseUrl from "../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Props {
  data: any[]
  loading:boolean
  error:null|string
}


export const FacilitiesData = createAsyncThunk<any, void>("GetFacilitiesSlice/FacilitiesData", async () => {
  let data = await baseUrl.get(`/api/v0/admin/room-facilities`,{
    headers:{
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk2ZjliYjYzODg0OGJjZTZlZmIwMjIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDM5MzE4NiwiZXhwIjoxNzA1NjAyNzg2fQ.I5XHfgYureXgFkNQgqGt_xIyzP2Q0Ven8TRy_WRTb4c`
    }

  })
  return data.data
})


let initialState:Props = {
  data: [],
  loading: false,
  error: null
}


export const GetFacilitiesSlice = createSlice({
  name: 'FacilitiesData',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(FacilitiesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FacilitiesData.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(FacilitiesData.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  }

})

export default GetFacilitiesSlice.reducer