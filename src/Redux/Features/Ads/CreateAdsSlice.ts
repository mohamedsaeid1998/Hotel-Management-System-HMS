import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";


export interface Props {
  data: any[]
  loading:boolean
  error:null|string
}
const token = localStorage.getItem("authToken")

export const CreateAds = createAsyncThunk<any, void>("CreateAdsSlice/CreateAds", async (details:any) => {



  const data = await baseUrl.post(`/api/v0/admin/ads`,{
    details
  },{
    headers:{
      Authorization: token,
    }

  })
  
  return data.data
})


let initialState:Props = {
  data: [],
  loading: false,
  error: null
}


export const CreateAdsSlice = createSlice({
  name: 'CreateFacility',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(CreateAds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateAds.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(CreateAds.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  }

})

export default CreateAdsSlice.reducer