import baseUrl from "../../../utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
interface LoginState {
  role: any;
  data: any[];
  isLogin: boolean;
  loading: boolean;
  errors: string | null;
}
const initialState: LoginState = {
  role: null,
  data: [],
  isLogin: false,
  loading: false,
  errors: null,
};

const fetchData = createAsyncThunk("login/fetchData", async (userData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v0/admin/users/login`,
      userData
    );

    localStorage.setItem("userRole", response.data.data.user.role);
    localStorage.setItem("token", response.data.data.token);
    console.log(response.data.message);
    toast.success(response.data.message);
    return response.data.data.user.role;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.role = action.payload;
      state.loading = false;
      state.isLogin = true;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = true;
      state.errors = action.payload;
    });
  },
});
export { fetchData };
export default loginSlice.reducer;
