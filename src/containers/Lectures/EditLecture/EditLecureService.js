import customAxios from '../../../customAxios';
import { getCookie } from '../../../guards/GetCookie';

export const getSubjectId = () => getCookie('subject_id');

export const editLecture = async (id, data) =>
  await customAxios.put(`/lectures/${id}/`, data);

export const getLectureData = async id =>
  await customAxios.get(`/lectures/${id}`);
