import { getCookie } from '../../guards/GetCookie';
export const isAuthenticated = () => {
  return getCookie('token') !== undefined ? true : false;
};
