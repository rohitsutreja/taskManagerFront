import { configureStore } from '@reduxjs/toolkit';
import  userSlice  from './features/users/userSlice';
import noteSlice from './features/notes/noteSlice';
import authSlice from './features/auth/authSlice'

const store = configureStore({
    reducer:{
        users: userSlice,
        notes: noteSlice,
        auth: authSlice
    }
})

export default store;