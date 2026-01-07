import { axios } from '~/plugins/axios';
import type { RegisterForm } from '~/types/register';

export const registerUser = (params: RegisterForm) =>
  axios.post('/auth/register', params).then(res => res.data);

export const loginUser = (data: { email: string; password: string }) =>
  axios.post('/auth/login', data).then(res => res.data);

export const logoutUser = () =>
  axios.post('/auth/logout').then(res => res.data);

export const me = () =>
  axios.get('/me').then(res => res.data);