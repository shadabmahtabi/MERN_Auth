import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const signUp = createAsyncThunk('auth/signUp', async (userData, thunkAPI) => {
  try {
    const response = await axiosInstance.post('http://localhost:8080/api/users/signup', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signIn = createAsyncThunk('auth/signIn', async (credentials, thunkAPI) => {
  try {
    const response = await axiosInstance.post('http://localhost:8080/api/users/signin', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const profile = createAsyncThunk('auth/profile', async (thunkAPI) => {
    try {

        const response = await axiosInstance.get('/users/profile');
        // console.log(response)
        return response.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    user: null
  },
  reducers: {
    signOut(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        localStorage.removeItem('token')
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;