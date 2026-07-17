import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', timeout: 50000 });
export const createStudySet = (notes, signal) => api.post('/study-set', { notes }, { signal }).then(({ data }) => data);

export const getErrorMessage = (error) => {
  if (axios.isCancel(error) || error.name === 'CanceledError') return null;
  if (error.code === 'ECONNABORTED') return 'The request timed out. Your notes are safe — please try again.';
  if (!error.response) return 'We could not reach the study service. Check your connection and try again.';
  return error.response.data?.error || 'Something went wrong while generating your study set.';
};
