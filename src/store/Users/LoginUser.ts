import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { StatusStore, IUser } from "../../types/Types";

const BASE_URL_LOGIN = import.meta.env.VITE_BASE_URL_LOGIN;

interface IUserState {
  User: IUser | null;
  token: string | null;
  status: StatusStore;
  error: string | null;
}

const initialState: IUserState = {
  User: null,
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("type/login", async (user: IUser) => {
  try {
    const response = await axios.post(BASE_URL_LOGIN, user);
    const token = response.data.token;
    const correctUser = response.data.user;
    if (token && correctUser) {
      localStorage.clear()
      localStorage.setItem("token", token);
      localStorage.setItem("correctUser", JSON.stringify(correctUser));
    }
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const UserLoginSlice = createSlice({
  name: "User Login",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.status = "idle"; 
      state.error = null; 
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.User = action.payload.user;
          state.token = action.payload.token;
          state.status = "fulfilled";
        }
      })
      .addCase(login.rejected, (state) => {
        state.error = "Cannot find user please singUp";
        state.status = "rejected";
      });
  },
});

export const { resetLoginState } = UserLoginSlice.actions;
export default UserLoginSlice.reducer;
