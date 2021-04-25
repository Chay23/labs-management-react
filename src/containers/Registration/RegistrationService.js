import axios from 'axios';
import { baseUrl } from '../../config';

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
    })
};