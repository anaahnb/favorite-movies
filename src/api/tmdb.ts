import { axios } from '~/plugins/axios';

export const getPopularMovies = (params?: object) =>
  axios
    .get('/movie/popular', { params })
    .then(res => res.data);

export const getMovieListByName = (params: object) =>
  axios
    .get('/search/movie', { params })
    .then(res => res.data)
