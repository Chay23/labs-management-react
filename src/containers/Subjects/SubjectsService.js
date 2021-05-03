import customAxios from '../../customAxios';

export const getSubjects = async () => {
  return await customAxios.get('/subjects');
};

export const setSubjectId = id => {
  document.cookie = `subject_id=${id}; path=/`;
};
