import { createSlice } from '@reduxjs/toolkit';

const loadTheme = () => localStorage.getItem('themeMode') || 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: loadTheme() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
