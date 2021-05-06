import customAxios from '../../../customAxios';
import { getCookie } from '../../../guards/GetCookie';

export const createSubject = async data => {
  return await customAxios.post('/subjects/', data);
};

export const getGroups = async () => {
  return await customAxios.get('/groups/group-list');
};

export const getUserId = () => getCookie('user_id');
