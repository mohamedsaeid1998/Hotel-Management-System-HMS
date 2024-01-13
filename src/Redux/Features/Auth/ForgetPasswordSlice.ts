import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import baseUrl from "../../../utils/Custom/Custom";
interface ForgetPasswordState {
  isForgetPassword: boolean;
  lodaingTow: boolean;
  loading: boolean;
  errors: string | null;
}
let initialState: ForgetPasswordState = {
  isForgetPassword: false,
  loading: false,
  errors: null,
};

const fetchData = createAsyncThunk(
  "ForgetPassword/fetchData",
  async (userData) => {
    const response = await baseUrl
      .post(`/api/v0/portal/users/forgot-password`, userData)
      .then(() => {
        toast.success("send successfully", {
          autoClose: 2000,
          theme: "colored",
        });
        console.log("true");
        return response.data.data.user.role;
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 2000,
          theme: "colored",
        });
      });
  }
);
const ForgetPasswordSlice = createSlice({
  name: "ForgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state) => {
      state.loading = false;
      state.isForgetPassword = true;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});
export { fetchData };
export default ForgetPasswordSlice.reducer;
