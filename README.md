# 🎬 Movie Explorer – Discover Your Favourite Films

A feature-rich React application that lets users search for movies, view details, discover trending films, and save favourites — powered by the [TMDb API](https://www.themoviedb.org/).

---

## 🚀 Live Demo

> Deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and paste the URL here.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Login UI | Username + password login with validation |
| 🔍 Movie Search | Real-time debounced search via TMDb |
| 🎬 Trending Movies | Weekly trending movies on the home page |
| 🃏 Movie Cards | Poster, title, release year, and star rating |
| 📄 Movie Details | Overview, genres, cast, runtime, tagline, and trailer |
| 🎞️ YouTube Trailer | Embedded YouTube trailer modal on the details page |
| ❤️ Favourites | Save/remove favourites — persisted in localStorage |
| 🔎 Filters | Filter by genre, release year, and sort order |
| ➕ Load More | Paginated "Load More" button for search & trending |
| 🌙 Dark / Light Mode | Toggle stored in localStorage |
| 💾 Last Search | Last searched query persisted in localStorage |
| 🛡️ Error Handling | User-friendly error banners with retry options |
| 📱 Responsive Design | Mobile-first layout using MUI Grid |

---

## 🛠️ Tech Stack

- **React 18** – UI library
- **Redux Toolkit** – Global state management
- **React Router v6** – Client-side routing
- **Material-UI (MUI) v5** – Component library & theming
- **Axios** – HTTP client for API requests
- **TMDb API v3** – Movie data source

---

## 📦 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Top navigation bar
│   ├── SearchBar.js       # Debounced search input
│   ├── MovieCard.js       # Movie poster card
│   ├── FilterBar.js       # Genre / year / sort filters
│   ├── LoadingGrid.js     # Skeleton loading placeholders
│   └── ErrorMessage.js    # Error alert banner
├── pages/
│   ├── Login.js           # Login page
│   ├── Home.js            # Home: trending + search + filters
│   ├── MovieDetails.js    # Full movie details + trailer
│   └── Favorites.js       # Saved favourites list
├── store/
│   ├── index.js           # Redux store setup
│   ├── moviesSlice.js     # Movies: trending, search, discover
│   ├── favoritesSlice.js  # Favourites CRUD (localStorage)
│   ├── authSlice.js       # Auth state (localStorage)
│   └── themeSlice.js      # Dark/light theme (localStorage)
└── services/
    └── api.js             # Axios client + TMDb API functions
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-gitlab-repo-url>
cd movie-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the TMDb API key

The app uses a public demo API key. For production use:

1. Create a free account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Go to **Settings → API** and request an API key
3. Replace the key in `src/services/api.js`:

```js
const TMDB_API_KEY = 'YOUR_API_KEY_HERE';
```

### 4. Start the development server
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |

---

## 🌐 API Usage

All requests go through `src/services/api.js` using a shared Axios instance.

| Function | Endpoint | Usage |
|---|---|---|
| `fetchTrending(page)` | `/trending/movie/week` | Home page trending section |
| `searchMovies(query, page)` | `/search/movie` | Search bar results |
| `fetchMovieDetails(id)` | `/movie/{id}` | Movie details page |
| `fetchGenres()` | `/genre/movie/list` | Filter bar genres |
| `discoverMovies(filters)` | `/discover/movie` | Filtered movie discovery |

---

## 🚢 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag the /build folder into Netlify dashboard
# OR connect your GitLab repo via Netlify UI
```

---

## 📝 Notes

- Login is a demo UI — any username + password ≥ 4 characters will work.
- Favourites and last search are persisted via `localStorage`.
- All protected routes redirect to `/login` when not authenticated.

---

## 👤 Author

Built for the **Loons Lab Internship Assignment** — Movie Explorer App.
