import customAxios from '../../../customAxios';
import { getCookie } from '../../../guards/GetCookie';

export const getLecture = async lecture_id => {
  return await customAxios.get(`/lectures/${lecture_id}`);
};
