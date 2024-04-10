import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


const initialState = {
  users: [],
  isLoading: true,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await api.get("http://localhost:5000/users/");
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

export const addUser = createAsyncThunk("users/addUser", async (user, {rejectWithValue}) => {
  try{

    const response = await api.post("http://localhost:5000/users/", user);
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response.data)
  }
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, {rejectWithValue}) => {

    try{
      const response = await api.delete(`http://localhost:5000/users/`, {
        data: { id: userId },
      });
      return response.data;
    }
    catch(error){
      return rejectWithValue(error.response.data)
    }
   
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
        console.error(action.payload.data); // Error message from the API
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        console.log(newUser);
        state.users.push(newUser);
      })
      .addCase(addUser.rejected, (state, action) => {
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.payload;
        state.users = state.users.filter((user) => user.id !== deletedUserId);
        console.log(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log(action.error.message); // Error message from the API
      });
  },
});

export default userSlice.reducer;
