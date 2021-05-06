import customAxios from '../../../customAxios';

export const deleteSubject = async id => {
  return await customAxios.delete(`/subjects/${id}/`);
};
