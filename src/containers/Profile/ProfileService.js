import customAxios from '../../customAxios';
import { getCookie } from '../../guards/GetCookie';

let userId = getCookie('user_id');

export const getUserData = async () => {
  let profileData;
  await customAxios.get(`/profiles/${userId}/`).then(response => {
    profileData = response.data;
  });
  return profileData;
};

export const updateUserData = async data => {
  return await customAxios.put(`/profiles/${userId}/`, data);
};

export const changePassword = async data => {
  return await customAxios.post('/auth/users/set_password/', data);
};
