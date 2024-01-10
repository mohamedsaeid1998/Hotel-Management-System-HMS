import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

interface AuthState {
  authToken: string | null;
  userRole: string | null; // Add userRole to AuthState
  error: string | null;
}

const initialState: AuthState = {
  authToken: null,
  userRole: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.authToken = null;
      state.userRole = null; // Clear userRole on logout
    },
  },
});

// Function to save user data including the user role
export const saveUserData = () => {
  const encodedToken: any = localStorage.getItem("authToken");
  const decodedToken: any = jwtDecode(encodedToken);
  setUserRole(decodedToken);
};

export const { setAuthToken, setUserRole, setError, clearError, logout } =
  authSlice.actions;

export const requestHeaders = {
  Authorization: `${localStorage.getItem("authToken")}`,
};

export const selectAuthToken = (state: { auth: AuthState }) =>
  state.auth.authToken;
export const selectUserRole = (state: { auth: AuthState }) =>
  state.auth.userRole; // Select userRole from the state
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
