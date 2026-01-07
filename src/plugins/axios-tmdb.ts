import $axios from 'axios';

const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Language': 'pt-BR',
};

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbAxios = $axios.create({
  baseURL: TMDB_BASE_URL,
  headers,
});

tmdbAxios.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: TMDB_API_KEY,
    };

    return config;
  },
  (error) => Promise.reject(error)
);
