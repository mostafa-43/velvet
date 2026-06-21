import { api } from './api';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  updatePassword: (currentPassword, newPassword) => api.put('/admin/auth/password', { currentPassword, newPassword }),
};
