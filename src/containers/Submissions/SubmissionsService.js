import { customAxios } from '../../customAxios';

export const getSubmissions = async () => await customAxios.get('submissions');
