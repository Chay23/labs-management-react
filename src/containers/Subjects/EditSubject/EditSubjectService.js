import customAxios from '../../../customAxios';

export const getSubjectData = async id => {
  return await customAxios.get(`subjects/${id}`);
};

export const getGroups = async () => {
  return await customAxios.get('/groups/group-list');
};

export const editSubject = async (subject_id, data) => {
  return await customAxios.put(`subjects/${subject_id}/`, data);
};
