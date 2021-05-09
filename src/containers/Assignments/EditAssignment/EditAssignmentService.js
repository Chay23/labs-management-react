import customAxios from '../../../customAxios';
import { getCookie } from '../../../guards/GetCookie';

export const getSubjectId = () => getCookie('subject_id');

export const editAssignment = async (id, data) =>
  await customAxios.put(`/assignments/${id}/`, data);

export const getAssignmentData = async id =>
  await customAxios.get(`/assignments/${id}`);
