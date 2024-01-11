import baseUrl from "../../../utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role: string;
  profileImage: FileList;
}

const initialState = {
  role: "user",
  loading: false,
  isRegister: false,
};

const fetchData = createAsyncThunk<string, UserData, { rejectValue: string }>(
  "login/fetchData",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      data.role = "user";
      const addFormData: RegisterState = new FormData();
      addFormData.append("userName", data["userName"]);
      addFormData.append("email", data["email"]);
      addFormData.append("password", data["password"]);
      addFormData.append("confirmPassword", data["confirmPassword"]);
      addFormData.append("phoneNumber", data["phoneNumber"]);
      addFormData.append("country", data["country"]);
      addFormData.append("role", data["role"]);
      addFormData.append("profileImage", data["profileImage"][0]);

      axios.post(`${baseUrl}/api/v0/admin/users`, addFormData).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(rejectWithValue(error));
      throw error;
    }
  }
);

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.role = action.payload;
      state.loading = false;
      state.isRegister = true;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = true;
      state.errors = action.payload;
    });
  },
});
export { fetchData };
export default RegisterSlice.reducer;
