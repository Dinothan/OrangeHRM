import {createSlice} from '@reduxjs/toolkit';
import {getUserInfo} from './LoginThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userId: '',
  error: null,
  isLoading: false,
  isAuthenticated: false,
};

const getAuthentication = async () => {
  const AuthenticatedUser = await AsyncStorage.getItem('@security_Key');
  return AuthenticatedUser;
};

const loginCheckSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserAuth: (state, action) => {
      const level = getAuthentication().then(res => {
        return res;
      });

      state.isAuthenticated =
        level.toString().length > 0 !== null ? true : false;
      state.userId = action.payload;
    },
    extraReducers: builder => {
      builder.addCase(getUserInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      });

      builder.addCase(getUserInfo.fulfilled, (state, {payload}) => {
        state.personalIdNumber = payload;
        state.isLoading = false;
      });

      builder.addCase(getUserInfo.rejected, (state, {payload}) => {
        if (payload != null) {
          state.error = payload.message;
        }
        state.isLoading = false;
      });
    },
  },
});

export const {saveUserAuth} = loginCheckSlice.actions;

export default loginCheckSlice.reducer;
