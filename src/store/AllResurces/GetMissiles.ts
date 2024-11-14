import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusStore , IMissile } from "../../types/Types";
import axios from "axios";

const VITE_BASE_URL_MISSILE = import.meta.env.VITE_BASE_URL_MISSILE;

interface MissileState {
    Missiles: IMissile[] | null;
    status: StatusStore;
    error: string | null;
  }
  
  const initialState: MissileState = {
    Missiles: null,
    status: "idle", 
    error: null
  };

  export const GetMissile = createAsyncThunk(
    "type/Get all Missiles",
    async () => {
      try {
        const response = await axios.get(VITE_BASE_URL_MISSILE);
        return response.data;
      } catch (err) {
        console.error(err)
      }
    }
  );


export const MissileSlice = createSlice({
    name: "All Missile",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(GetMissile.pending, (state) => {
          state.status = "pending";
          state.error = null
      })
      .addCase(GetMissile.fulfilled, (state, action) => {
          if (action.payload) state.Missiles = action.payload;
          state.status = "fulfilled";
        })
        .addCase(GetMissile.rejected, (state) => {
          state.error = "Cannot fetch Posts";
          state.status = "rejected";
        })
    },
  });

export default MissileSlice.reducer;