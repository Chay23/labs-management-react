import customAxios from '../../customAxios';
import { getCookie } from '../../guards/GetCookie';

export const getSubjectId = () => getCookie('subject_id');

export const getLectures = async () => {
  let subject_id = getSubjectId();
  return await customAxios
    .get(`/lectures/subject/${subject_id}`)
    .then(response => response.data);
};

export const getSubjectTitle = async () => {
  let subject_id = getSubjectId();
  return await customAxios
    .get(`/subjects/${subject_id}`)
    .then(response => response.data.title);
};

export const verifySubjectId = () => {
  return getCookie('subject_id') ? true : false;
};

export const getUserStatus = () => {
  const is_instructor = getCookie('is_instructor');
  if (is_instructor === 'true') {
    return true;
  } else {
    return false;
  }
};
