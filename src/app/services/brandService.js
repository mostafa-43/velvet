import { api } from './api';
import { brands as mockBrands } from '../data/mockData';

async function safeRequest(promise, fallback) {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

async function safeWrite(promise, mockResult) {
  try {
    return await promise;
  } catch {
    return mockResult;
  }
}

export const brandService = {
  getAll: (signal) => safeRequest(api.get('/brands', signal), mockBrands),
  getFeatured: (signal) => safeRequest(api.get('/brands?featured=true', signal), mockBrands.filter(b => b.featured)),
  getBySlug: (slug, signal) => safeRequest(api.get(`/brands/${slug}`, signal), mockBrands.find(b => b.slug === slug) || null),
  getById: (id) => safeRequest(api.get(`/brands/${id}`), mockBrands.find(b => b.id === id) || null),
  create: async (data) => {
    const newBrand = { ...data, id: 'b' + Date.now(), productCount: 0 };
    return safeWrite(api.post('/brands', data), { brand: newBrand, ...newBrand });
  },
  update: async (id, data) => safeWrite(api.put(`/brands/${id}`, data), { ...data, id }),
  delete: async (id) => safeWrite(api.delete(`/brands/${id}`), true),
};
