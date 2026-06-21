import { api } from './api';
import { heroBanners as mockBanners } from '../data/mockData';

async function safeRequest(promise, fallback) {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

export const bannerService = {
  getAll: (signal) => safeRequest(api.get('/banners', signal), mockBanners),
  getActive: (signal) => safeRequest(api.get('/banners?active=true', signal), mockBanners),
  create: (data) => api.post('/banners', data),
  update: (id, data) => api.put(`/banners/${id}`, data),
  delete: (id) => api.delete(`/banners/${id}`),
};
