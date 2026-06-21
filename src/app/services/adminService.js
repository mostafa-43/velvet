import { api } from './api';

export const adminService = {
  getMessages: () => api.get('/admin/contact'),
  getMessage: (id) => api.get(`/admin/contact/${id}`),
  deleteMessage: (id) => api.delete(`/admin/contact/${id}`),
  getSubscribers: () => api.get('/admin/newsletter'),
  getSettings: () => api.get('/admin/settings'),
  updateSetting: (key, value) => api.put(`/admin/settings/${key}`, { value }),
  uploadFile: (formData) => api.upload('/admin/upload', formData),
  uploadMultiple: (formData) => api.upload('/admin/upload/multiple', formData),
  getBrand: (id) => api.get(`/brands/${id}`),
};
