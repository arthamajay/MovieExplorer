import axios from 'axios';
// dotenv not needed in browser

// dotenv config removed

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

tmdbClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

export const fetchTrending = (page = 1) =>
  tmdbClient.get('/trending/movie/week', { params: { page } });

export const searchMovies = (query, page = 1) =>
  tmdbClient.get('/search/movie', { params: { query, page } });

export const fetchMovieDetails = (id) =>
  tmdbClient.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar' },
  });

export const fetchGenres = () =>
  tmdbClient.get('/genre/movie/list');

export const discoverMovies = ({ genreId, year, sortBy, page = 1 }) =>
  tmdbClient.get('/discover/movie', {
    params: {
      with_genres: genreId || undefined,
      primary_release_year: year || undefined,
      sort_by: sortBy || 'popularity.desc',
      page,
    },
  });
