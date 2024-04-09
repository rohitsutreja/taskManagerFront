import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const URL = "http://localhost:5000";

const initialState = {
  notes: [],
  isLoading: true,
  isSuccess: false,
  isError: false,
};

export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  const response = await api.get(`${URL}/notes/`);
  return response.data;
});

export const editNote = createAsyncThunk(
  "notes/editNote",
  async (updatatedNoteData,{rejectWithValue}) => {
    try{
      const response = await api.patch(`${URL}/notes/`, updatatedNoteData);
      return response.data;
    }
    catch(error){
      return rejectWithValue(error.response.data)
    }
  
  }
);

export const addNote = createAsyncThunk("notes/addNote", async (note, {rejectWithValue}) => {
  try{
    const response = await api.post(`${URL}/notes/`, note);
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response.data)
  }
 
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (note) => {
    console.log(note._id+ "123456")
    const response = await api.delete(`${URL}/notes/`, {data:{ id : note._id}});
    return response.data;
  });

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote.id ? updatedNote : note
        );
      })
      .addCase(editNote.rejected, (state, action) => {
        console.log(action.payload)
      })
      .addCase(addNote.fulfilled, (state, action) => {
        const newNote = action.payload;
        state.notes.push(newNote);
      })
      .addCase(addNote.rejected, (state, action) => {
        console.error(action.payload); // Error message from the API
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        const deletedNoteId = action.payload;
        state.notes = state.notes.filter((note) => note._id !== deletedNoteId);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        console.error(action.payload); // Error message from the API
      });
  },
});

export default noteSlice.reducer;
