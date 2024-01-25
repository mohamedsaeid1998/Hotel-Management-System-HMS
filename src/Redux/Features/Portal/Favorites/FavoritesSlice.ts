import baseUrl from "@/utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};
const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("authToken");
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await baseUrl.get(`/api/v0/portal/favorite-rooms`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(data.data.data);
      return data.data.data.favoriteRooms;
    } catch (error) {
      console.log("error", error);
      rejectWithValue(error);
    }
  }
);

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavorites.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getFavorites.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export { getFavorites };
export default FavoritesSlice.reducer;
