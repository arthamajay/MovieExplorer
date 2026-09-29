import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: loadFavorites() },
  reducers: {
    addFavorite(state, action) {
      const exists = state.items.find((m) => m.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((m) => m.id !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
