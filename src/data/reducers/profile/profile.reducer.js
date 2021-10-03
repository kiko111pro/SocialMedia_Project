import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { getOfflineData, setDataOffline } from '../../services/services.common';

export const getCurrentUserDetails = createAsyncThunk(
  'profile/currentUserDetails',
  async (payload, thunkAPI) => {
    try {
      const res = await firestore().collection('Users').doc(payload).get();
      await setDataOffline('CURRENT_USER', res._data);
      console.log('Giving from online');
      return res;
    } catch (error) {
      let offlineData = await getOfflineData('CURRENT_USER');
      if (offlineData) {
        console.log('Giving from Offline');
        return offlineData;
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    currentUserDetails: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [getCurrentUserDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getCurrentUserDetails.rejected]: (state, action) => {
      state.currentUserDetails = null;
      state.loading = false;
    },
    [getCurrentUserDetails.fulfilled]: (state, action) => {
      state.currentUserDetails = action.payload;
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;
export const { updateUser } = profileSlice.actions;
