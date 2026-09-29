import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import favoritesReducer from './favoritesSlice';
import authReducer from './authSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;
