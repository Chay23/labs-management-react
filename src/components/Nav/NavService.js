import { getCookie } from '../../guards/GetCookie';
export const isAuthenticated = () => {
  return getCookie('token') !== undefined ? true : false;
};

export const getSubjectId = () => {
  // console.log(getCookie('subject_id '));
  return getCookie('subject_id');
};
