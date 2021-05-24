import customAxios from '../../customAxios';
import { getCookie } from '../../guards/GetCookie';

export const getSubmissions = async assignment_id =>
  await customAxios.get(`submissions/assignment/${assignment_id}`);

export const getSubjectId = () => getCookie('subject_id');

export const getSubjectTitle = async () => {
  let subject_id = getSubjectId();
  return await customAxios
    .get(`/subjects/${subject_id}`)
    .then(response => response.data.title);
};

export const getAttachedFileName = fileName => {
  fileName = decodeURIComponent(fileName);
  fileName = fileName.match(/[-\s\w\d а-яА-яІЇії]*.[a-z]*$/);
  return fileName[0];
};

export const sendFeedback = (data, assignment_id) => {
  return customAxios.patch(`/submissions/${assignment_id}/`, data);
};
