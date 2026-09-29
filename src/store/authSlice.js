import { createSlice } from '@reduxjs/toolkit';

const loadAuth = () => {
  try {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : { isLoggedIn: false, username: '' };
  } catch {
    return { isLoggedIn: false, username: '' };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuth(),
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload;
      localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, username: action.payload }));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
