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
  // let response_result;
  return await customAxios.put(`/profiles/${userId}/`, data);
  // return response_result;
};

export const changePassword = async data => {
  // let response_result;
  return await customAxios.post('/auth/users/set_password/', data);
  // .then(response => (response_result = response));
  // return response_result;
};
