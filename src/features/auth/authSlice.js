import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const URL = "http://localhost:5000";

export const logIn = createAsyncThunk("auth/logIn", async (credentials) => {
  const response = await api.post(`${URL}/auth/`, { ...credentials });
  return response.data;
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  const response = await api.get(`${URL}/auth/logout/`);
  return response.data;
});

export const refresh = createAsyncThunk("auth/refresh", async () => {
  const response = await api.get(`${URL}/auth/refresh/`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.token = accessToken;

      })
      .addCase(logIn.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.token = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
      })
      .addCase(refresh.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
