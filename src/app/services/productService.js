import { api } from './api';
import { products as mockProducts } from '../data/mockData';

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

function mockPaginate(list, params) {
  let filtered = [...list];
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.brandName.toLowerCase().includes(q));
  }
  if (params.brandId) filtered = filtered.filter(p => p.brandId === params.brandId);
  if (params.categoryId) filtered = filtered.filter(p => p.categoryId === params.categoryId);
  if (params.filter === 'new') filtered = filtered.filter(p => p.isNew);
  if (params.filter === 'trending') filtered = filtered.filter(p => p.isTrending);
  if (params.filter === 'featured') filtered = filtered.filter(p => p.isFeatured);
  if (params.filter === 'sale') filtered = filtered.filter(p => p.originalPrice);
  if (params.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (params.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  const limit = parseInt(params.limit) || 12;
  const page = parseInt(params.page) || 1;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const products = filtered.slice(start, start + limit);
  return { products, total, page, totalPages };
}

async function getAll(params = {}, signal) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.brandId) query.set('brandId', params.brandId);
  if (params.categoryId) query.set('categoryId', params.categoryId);
  if (params.filter) query.set('filter', params.filter);
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);
  const qs = query.toString();
  return safeRequest(api.get(`/products${qs ? `?${qs}` : ''}`, signal), mockPaginate(mockProducts, params));
}

export const productService = {
  getAll,
  getById: (id, signal) => safeRequest(api.get(`/products/${id}`, signal), mockProducts.find(p => p.id === id) || null),
  getByBrand: (brandId, signal) => safeRequest(api.get(`/products?brandId=${brandId}`, signal), mockProducts.filter(p => p.brandId === brandId)),
  getTrending: async (signal) => {
    const data = await getAll({ filter: 'trending', limit: 6 }, signal);
    return data.products;
  },
  getNew: async (signal) => {
    const data = await getAll({ filter: 'new', limit: 4 }, signal);
    return data.products;
  },
  getFeatured: async (signal) => {
    const data = await getAll({ filter: 'featured' }, signal);
    return data.products;
  },
  create: async (data) => {
    const newProduct = { ...data, id: 'p' + Date.now(), image: '', images: [], rating: 0, reviewCount: 0, inStock: true };
    return safeWrite(api.post('/products', data), { product: newProduct, ...newProduct });
  },
  update: async (id, data) => safeWrite(api.put(`/products/${id}`, data), { product: { ...data, id }, ...data, id }),
  delete: async (id) => safeWrite(api.delete(`/products/${id}`), true),
};
