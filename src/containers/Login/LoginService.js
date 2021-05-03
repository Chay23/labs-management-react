import customAxios from '../../customAxios';
import axios from 'axios';
import { baseUrl } from '../../config';

export const setUserId = async () => {
  await customAxios.get('/auth/users/me').then(response => {
    let id = response.data.id;
    document.cookie = `user_id=${id}; path=/`;
  });
};

export const login = async data => {
  await axios.post(baseUrl + '/auth/token/login/', data).then(response => {
    const token = response.data.auth_token;
    document.cookie = `token=${token}; path=/`;
  });
};
