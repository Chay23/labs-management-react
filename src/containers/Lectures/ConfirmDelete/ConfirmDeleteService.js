import customAxios from '../../../customAxios';

export const deleteLecture = async id => {
  return await customAxios.delete(`/lectures/${id}/`);
};
