import customAxios from '../../customAxios';
import { getCookie } from '../../guards/GetCookie';

export const getSubjects = async () => {
  return await customAxios.get('/subjects/user-group/list');
};

export const getInstructorsSubjects = async () => {
  return await customAxios.get('subjects/user/list');
};

export const setSubjectId = id => {
  document.cookie = `subject_id=${id}; path=/`;
};

export const getUserStatus = () => {
  const is_instructor = getCookie('is_instructor');
  if (is_instructor === 'true') {
    return true;
  } else {
    return false;
  }
};
