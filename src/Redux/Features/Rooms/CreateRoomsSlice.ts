/** @format */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/Custom/Custom";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}
const token = localStorage.getItem("authToken");

export const CreateRooms = createAsyncThunk<any, void>(
  "CreateRoomsSlice/CreateRooms",
async (addFormData: any) => {
try {
  await baseUrl.post(`/api/v0/admin/rooms`,
  addFormData,
  {
    headers: {
      Authorization: token,
    },
  }
).then((res) => {
  console.log(res)
        toast.success(res.data.message, {
          autoClose: 2000,
          theme: "colored",
        })

        return res
      }
      )
} catch (error) {
  console.log("here");
  
  toast.error(error?.response?.data?.message, {
    autoClose: 2000,
    theme: "colored",
    
  })

  return error
}
}






  // export const CreateRooms = createAsyncThunk<any, void>("CreateRoomsSlice/CreateRooms", async (addFormData:any) => {

  //   let data = await baseUrl.post(`/api/v0/admin/rooms`,
  //     addFormData
  //   ,{
  //     headers:{
  //       Authorization: token,
  //       "Content-Type": "multipart/form-data"
  //     }
  //   }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const CreateRoomsSlice = createSlice({
  name: "CreateRooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      CreateRooms.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      CreateRooms.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default CreateRoomsSlice.reducer;
