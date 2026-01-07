import { tmdbAxios as axios } from '~/plugins/axios-tmdb';

export const getPopularMovies = (params?: object) =>
  axios
    .get('/movie/popular', { params })
    .then(res => res.data);

export const getMovieListByName = (params: object) =>
  axios
    .get('/search/movie', { params })
    .then(res => res.data)

export const getMovieDetailsById = (movie_id: number, params: object) =>
  axios
    .get(`/movie/${movie_id}`, { params })
    .then(res => res.data)
