import { api } from './api';
import { categories as mockCategories } from '../data/mockData';

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

export const categoryService = {
  getAll: (signal) => safeRequest(api.get('/categories', signal), mockCategories),
  create: async (data) => {
    const newCat = { ...data, id: 'cat' + Date.now(), productCount: 0 };
    return safeWrite(api.post('/categories', data), { category: newCat, ...newCat });
  },
  update: async (id, data) => safeWrite(api.put(`/categories/${id}`, data), { ...data, id }),
  delete: async (id) => safeWrite(api.delete(`/categories/${id}`), true),
};
