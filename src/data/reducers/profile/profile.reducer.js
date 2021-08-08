import {createSlice} from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {},
});

export default profileSlice.reducer;
export const {updateUser} = profileSlice.actions;
