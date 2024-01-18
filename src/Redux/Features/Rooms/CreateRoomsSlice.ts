import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";


export interface Props {
  data: any[]
  loading:boolean
  error:null|string
}
const token = localStorage.getItem("authToken")

export const CreateRooms = createAsyncThunk<any, void>("CreateRoomsSlice/CreateRooms", async (addFormData:any) => {



  let data = await baseUrl.post(`/api/v0/admin/rooms`,
    addFormData
  ,{
    headers:{
      Authorization: token,
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