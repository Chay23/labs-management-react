import customAxios from '../../customAxios';
import { getCookie } from '../../guards/GetCookie';

export const getLectures = async () => {
  let subject_id = getCookie('subject_id');
  return await customAxios
    .get(`/lectures/subject/${subject_id}`)
    .then(response => response.data);
};

export const getSubjectTitle = async () => {
  let subject_id = getCookie('subject_id');
  return await customAxios
    .get(`/subjects/${subject_id}`)
    .then(response => response.data.title);
};

export const verifySubjectId = () => {
  return getCookie('subject_id') ? true : false;
}