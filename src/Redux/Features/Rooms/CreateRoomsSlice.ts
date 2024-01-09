import baseUrl from "../../../utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export interface Props {
  data: any[]
  loading:boolean
  error:null|string
}


export const CreateRooms = createAsyncThunk<any, void>("CreateRoomsSlice/CreateRooms", async ({roomNumber,price,capacity,discount,facilities,images}:any) => {

console.log(images);
console.log(facilities);

  let data = await baseUrl.post(`/api/v0/admin/rooms`,{
    roomNumber,
    price,
    capacity,
    discount,
    facilities,
    imgs:images
  },{
    headers:{
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk2ZjliYjYzODg0OGJjZTZlZmIwMjIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDM5MzE4NiwiZXhwIjoxNzA1NjAyNzg2fQ.I5XHfgYureXgFkNQgqGt_xIyzP2Q0Ven8TRy_WRTb4c`,
      "Content-Type": "multipart/form-data"
    }

  })
  
  return data.data
})


let initialState:Props = {
  data: [],
  loading: false,
  error: null
}


export const CreateRoomsSlice = createSlice({
  name: 'CreateRooms',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(CreateRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateRooms.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(CreateRooms.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  }

})

export default CreateRoomsSlice.reducer