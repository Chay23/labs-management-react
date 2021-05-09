import { getCookie } from './GetCookie';

export const isAuthenticated = () => {
  return getCookie('token') !== undefined ? true : false;
};
