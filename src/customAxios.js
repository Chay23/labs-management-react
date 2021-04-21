import axios from 'axios';
import { baseUrl } from './config';
import { getCookie } from './guards/GetCookie';

const customAxios = axios.create({
  baseURL: baseUrl,
});

customAxios.interceptors.request.use(
  config => {
    const token = getCookie('token');
    config.headers['Authorization'] = `Token ${token}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default customAxios;
