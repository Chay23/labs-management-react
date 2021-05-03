import customAxios from '../../../customAxios';

export const getLecture = async lecture_id => {
  return await customAxios.get(`/lectures/${lecture_id}`);
};
