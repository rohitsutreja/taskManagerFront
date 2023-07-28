import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


const initialState = {
  users: [],
  isLoading: true,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await api.get("http://localhost:5000/users");
  return response.data;
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUserData) => {
    const response = await api.patch(
      `http://localhost:5000/users/`,
      updatedUserData
    );
    return response.data;
  }
);

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await api.post("http://localhost:5000/users", user);
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const response = await api.delete(`http://localhost:5000/users`, {
      data: { id: userId },
    });
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // You can add other synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        // Handle the error if needed
        console.error(action.payload); // Error message from the API
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        console.log(newUser);
        state.users.push(newUser);
      })
      .addCase(addUser.rejected, (state, action) => {
        // Handle the error if needed
        console.log(action.error.message); // Error message from the API
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.payload;
        state.users = state.users.filter((user) => user.id !== deletedUserId);
        console.log(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        // Handle the error if needed
        console.log(action.error.message); // Error message from the API
      });
  },
});

export default userSlice.reducer;
