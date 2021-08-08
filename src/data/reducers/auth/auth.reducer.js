import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firebaseSetup from '../../../../setup';
const {auth} = firebaseSetup();

export const signIn = createAsyncThunk(
  'auth/confirmation',
  async (payload, thunkAPI) => {
    try {
      const res = await auth().signInWithPhoneNumber(payload);

      return res;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// export const checkLogin = createAsyncThunk(
//   'auth/checkLogin',
//   async (payload, thunkAPI) => {
//     const loginInfo = await
//   }
// )

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    confirmation: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
    },
  },
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.confirmation = action.payload;
      state.loading = false;
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
    },
    [signIn.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export default authSlice.reducer;
