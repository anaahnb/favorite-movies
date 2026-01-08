import { axios } from '~/plugins/axios';

export const getFavoriteList = () =>
  axios.get('/favorites').then(res => res.data);

export const storeFavoriteMovie = (params: object) =>
  axios.post('/favorites', params).then(res => res.data);