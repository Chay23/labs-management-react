import { getCookie } from '../../guards/GetCookie';
export const isAuthenticated = () => {
  return getCookie('token') !== undefined ? true : false;
};

export const getSubjectId = () => {
  return getCookie('subject_id');
};
