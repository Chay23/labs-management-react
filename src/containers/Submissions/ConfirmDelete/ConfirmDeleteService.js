import customAxios from '../../../customAxios';

export const deleteAssignment = async id => {
  return await customAxios.delete(`/submissions/${id}/`);
};
