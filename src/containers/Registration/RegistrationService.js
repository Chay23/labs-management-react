import axios from 'axios';
import customAxios from '../../customAxios';
import { baseUrl } from '../../config';
import { getCookie } from '../../guards/GetCookie';

export const getGroups = async () => {
  return await axios.get(baseUrl + '/groups/group-list');
};

export const register = async data => {
  return await axios.post(baseUrl + '/create-profile/', data);
};
export const setToken = async data => {
  return await axios
    .post(baseUrl + '/auth/token/login/', data)
    .then(response => {
      const token = response.data.auth_token;
      document.cookie = `token=${token}; path=/`;
    });
};

export const setUserId = async () => {
  await customAxios.get('/auth/users/me').then(response => {
    let id = response.data.id;
    document.cookie = `user_id=${id}; path=/`;
  });
};

export const setUserStatus = async () => {
  let id = getCookie('user_id');
  await customAxios.get(`/users/${id}`).then(response => {
    let status = response.data.is_instructor;
    document.cookie = `is_instructor=${status}; path=/`;
  });
};
