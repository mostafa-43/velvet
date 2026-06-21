import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

const BASE_SELECT = `
  SELECT p.*, b.name AS brandName, c.name AS categoryName
  FROM products p
  LEFT JOIN brands b ON p.brand_id = b.id
  LEFT JOIN categories c ON p.category_id = c.id
`;

const SORT_MAP = {
  'price-asc': 'p.price ASC',
  'price-desc': 'p.price DESC',
  'rating': 'p.rating DESC',
  'newest': 'p.created_at DESC',
  'name': 'p.name ASC'
};

function buildWhereClause(filters) {
  const conditions = [];
  const params = [];

  if (filters.search) {
    conditions.push('p.name LIKE ?');
    params.push(`%${filters.search}%`);
  }
  if (filters.brandId) {
    conditions.push('p.brand_id = ?');
    params.push(filters.brandId);
  }
  if (filters.categoryId) {
    conditions.push('p.category_id = ?');
    params.push(filters.categoryId);
  }
  if (filters.isNew !== undefined) {
    conditions.push('p.is_new = ?');
    params.push(filters.isNew ? 1 : 0);
  }
  if (filters.isTrending !== undefined) {
    conditions.push('p.is_trending = ?');
    params.push(filters.isTrending ? 1 : 0);
  }
  if (filters.isFeatured !== undefined) {
    conditions.push('p.is_featured = ?');
    params.push(filters.isFeatured ? 1 : 0);
  }
  if (filters.inStock !== undefined) {
    conditions.push('p.in_stock = ?');
    params.push(filters.inStock ? 1 : 0);
  }
  if (filters.minPrice !== undefined) {
    conditions.push('p.price >= ?');
    params.push(filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    conditions.push('p.price <= ?');
    params.push(filters.maxPrice);
  }
  if (filters.hasOriginalPrice) {
    conditions.push('p.original_price IS NOT NULL');
  }

  return { conditions, params };
}

export default {
  async findAll(filters = {}) {
    const page = Math.max(1, parseInt(filters.page) || 1);
    const limit = Math.max(1, parseInt(filters.limit) || 12);
    const offset = (page - 1) * limit;

    const { conditions, params } = buildWhereClause(filters);
    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRows = await query(`SELECT COUNT(*) AS total FROM products p ${where}`, params);
    const total = countRows[0].total;

    const sortBy = SORT_MAP[filters.sortBy] || 'p.created_at DESC';
    const orderClause = `ORDER BY ${sortBy}`;

    const products = await query(
      `${BASE_SELECT} ${where} ${orderClause} LIMIT ? OFFSET ?`,
      [...params, String(limit), String(offset)]
    );

    return {
      products: toCamel(products),
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  },

  async findById(id) {
    const rows = await query(`${BASE_SELECT} WHERE p.id = ?`, [id]);
    return toCamel(rows[0]) || null;
  },

  async findByBrandId(brandId) {
    return toCamel(await query(`${BASE_SELECT} WHERE p.brand_id = ? ORDER BY p.created_at DESC`, [brandId]));
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const {
      name, brand_id, category_id, price = 0, original_price = null,
      description = null, features = null, age_range = '3+',
      rating = 0, review_count = 0,
      is_new = 0, is_trending = 0, is_featured = 0,
      video_url = null, in_stock = 1
    } = dbData;
    const featuresJson = features ? JSON.stringify(features) : null;
    await query(
      `INSERT INTO products (id, name, brand_id, category_id, price, original_price, description, features, age_range, rating, review_count, is_new, is_trending, is_featured, video_url, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, brand_id, category_id, price, original_price, description, featuresJson, age_range, rating, review_count, is_new, is_trending, is_featured, video_url, in_stock]
    );
    return this.findById(id);
  },

  async update(id, data) {
    const dbData = toDb(data);
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(dbData)) {
      if (value !== undefined) {
        let val = value;
        if (key === 'features' && val !== null) {
          val = JSON.stringify(val);
        }
        fields.push(`${key} = ?`);
        values.push(val);
      }
    }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    await query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async remove(id) {
    const result = await query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async updateCounts() {
    await query(`
      UPDATE brands b
      SET b.product_count = (SELECT COUNT(*) FROM products p WHERE p.brand_id = b.id)
    `);
    await query(`
      UPDATE categories c
      SET c.product_count = (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id)
    `);
  }
};
