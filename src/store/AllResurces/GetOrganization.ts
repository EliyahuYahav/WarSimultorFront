import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusStore , IOrganizations } from "../../types/Types";
import axios from "axios";

const VITE_BASE_URL_ORGANIZATION = import.meta.env.VITE_BASE_URL_ORGANIZATION;

interface OrganizationsState {
    organizations: IOrganizations | null;
    status: StatusStore;
    error: string | null;
  }
  
  const initialState: OrganizationsState = {
    organizations: null,
    status: "idle", 
    error: null
  };

  export const GetOrganizations = createAsyncThunk(
    "type/Get Organizations",
    async (name:string) => {
      try {
        const response = await axios.get(`${VITE_BASE_URL_ORGANIZATION}${name}`);
        return response.data;
      } catch (err) {
        console.error(err)
      }
    }
  );


export const OrganizationsSlice = createSlice({
    name: "Organizations",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(GetOrganizations.pending, (state) => {
          state.status = "pending";
          state.error = null
      })
      .addCase(GetOrganizations.fulfilled, (state, action) => {
          if (action.payload) state.organizations = action.payload;
          state.status = "fulfilled";
        })
        .addCase(GetOrganizations.rejected, (state) => {
          state.error = "Cannot fetch Posts";
          state.status = "rejected";
        })
    },
  });

export default OrganizationsSlice.reducer;