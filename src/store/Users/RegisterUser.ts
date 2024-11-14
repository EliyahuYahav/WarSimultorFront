import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusStore , IUser } from "../../types/Types";
import axios from "axios";

const BASE_URL_REGISTER = import.meta.env.VITE_BASE_URL_REGISTER;

interface UserState {
    User: IUser | null;
    status: StatusStore;
    error: string | null;
  }
  
  const initialState: UserState = {
    User: null,
    status: "idle", 
    error: null
  };

  export const register = createAsyncThunk(
    "type/register",
    async (user:IUser) => {
      try {
        const response = await axios.post(BASE_URL_REGISTER, user);
        return response.data;
      } catch (err) {
        console.error(err)
      }
    }
  );


export const UserRegisterSlice = createSlice({
    name: "User Register",
    initialState,
    reducers: {
      resetRegisterState: (state) => {
        state.status = "idle"; 
        state.error = null; 
      },
    },
    extraReducers(builder) {
      builder
        .addCase(register.pending, (state) => {
          state.status = "pending";
          state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
          if (action.payload) state.User = action.payload;
          state.status = "fulfilled";
        })
        .addCase(register.rejected, (state) => {
          state.error = "Cannot fetch Posts";
          state.status = "rejected";
        })
    },
  });
export const { resetRegisterState } = UserRegisterSlice.actions;
export default UserRegisterSlice.reducer;