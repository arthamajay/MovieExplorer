import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrending, searchMovies, discoverMovies, fetchGenres } from '../services/api';

export const getTrending = createAsyncThunk(
  'movies/getTrending',
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await fetchTrending(page);
      return { ...res.data, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getSearchResults = createAsyncThunk(
  'movies/getSearchResults',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await searchMovies(query, page);
      return { ...res.data, page, query };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getDiscoverResults = createAsyncThunk(
  'movies/getDiscoverResults',
  async (filters, { rejectWithValue }) => {
    try {
      const res = await discoverMovies(filters);
      return { ...res.data, page: filters.page || 1 };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getGenres = createAsyncThunk(
  'movies/getGenres',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchGenres();
      return res.data.genres;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    trending: [],
    trendingPage: 1,
    trendingTotalPages: 1,
    searchResults: [],
    searchQuery: '',
    searchPage: 1,
    searchTotalPages: 1,
    discoverResults: [],
    discoverPage: 1,
    discoverTotalPages: 1,
    genres: [],
    loading: false,
    error: null,
    filters: {
      genreId: '',
      year: '',
      sortBy: 'popularity.desc',
    },
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      if (action.payload) {
        localStorage.setItem('lastSearchedMovie', action.payload);
      }
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchQuery = '';
      state.searchPage = 1;
      state.searchTotalPages = 1;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload.page === 1
          ? action.payload.results
          : [...state.trending, ...action.payload.results];
        state.trendingPage = action.payload.page;
        state.trendingTotalPages = action.payload.total_pages;
      })
      .addCase(getTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.page === 1
          ? action.payload.results
          : [...state.searchResults, ...action.payload.results];
        state.searchQuery = action.payload.query;
        state.searchPage = action.payload.page;
        state.searchTotalPages = action.payload.total_pages;
      })
      .addCase(getSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getDiscoverResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDiscoverResults.fulfilled, (state, action) => {
        state.loading = false;
        state.discoverResults = action.payload.page === 1
          ? action.payload.results
          : [...state.discoverResults, ...action.payload.results];
        state.discoverPage = action.payload.page;
        state.discoverTotalPages = action.payload.total_pages;
      })
      .addCase(getDiscoverResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { setSearchQuery, setFilters, clearSearchResults, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
