import api from './api';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.accessToken);
  return response.data;
};

export const register = async (data: {
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post('/auth/register', data);
  localStorage.setItem('token', response.data.accessToken);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};