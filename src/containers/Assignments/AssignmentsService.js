import customAxios from '../../customAxios';
import { getCookie } from '../../guards/GetCookie';

export const getSubjectId = () => getCookie('subject_id');

export const getAssignments = async () => {
  const subject_id = getSubjectId();
  return await customAxios.get(`/assignments/subject/${subject_id}`);
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

export const getUserStatus = () => getCookie('is_instructor');
