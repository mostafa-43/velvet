import { api } from './api';

export const homepageService = {
  getSections: (signal) => api.get('/homepage/sections', signal),
  updateSection: (id, data) => api.put(`/homepage/sections/${id}`, data),
};
