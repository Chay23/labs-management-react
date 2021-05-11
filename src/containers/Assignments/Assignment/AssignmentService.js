import customAxios from '../../../customAxios';
import { getCookie } from '../../../guards/GetCookie';

export const getAssignment = async assignment_id => {
  return await customAxios.get(`/assignments/${assignment_id}`);
};

export const getUserId = () => getCookie('user_id');

export const sendSubmission = async data => {
  return await customAxios.post('/submissions/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserStatus = () => {
  const is_instructor = getCookie('is_instructor');
  if (is_instructor === 'true') {
    return true;
  } else {
    return false;
  }
};