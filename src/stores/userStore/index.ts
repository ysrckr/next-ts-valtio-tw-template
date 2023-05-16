import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserState } from './User';

const initialState: UserState = {
  user: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  return Promise.resolve({ id: 1, name: 'John Doe' });
});

export const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectUser = (state: { user: UserState }) => state.user.user;
