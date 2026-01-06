import { axios } from '~/plugins/axios';


export const getPopularMovies = (params?: object) =>
  axios
    .get('/movie/popular', { params })
    .then(res => res.data);
