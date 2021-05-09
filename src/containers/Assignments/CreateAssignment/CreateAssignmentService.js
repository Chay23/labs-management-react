import customAxios from '../../../customAxios';
import { getCookie } from '../../../guards/GetCookie';

export const createLecture = async data =>
  await customAxios.post('/assignments/', data);

export const getUserId = () => getCookie('user_id');

export const getSubjectId = () => getCookie('subject_id');
