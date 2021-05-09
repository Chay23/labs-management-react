import { getCookie } from '../../guards/GetCookie';

export const getSubjectId = () => getCookie('subject_id');

export const handleLogout = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  document.cookie =
    'is_instructor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  document.cookie =
    'user_id=undefined; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  document.cookie =
    'subject_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
};
