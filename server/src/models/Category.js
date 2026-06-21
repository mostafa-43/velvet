import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM categories ORDER BY name ASC'));
  },

  async findById(id) {
    const rows = await query('SELECT * FROM categories WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
  },

  async findBySlug(slug) {
    const rows = await query('SELECT * FROM categories WHERE slug = ?', [slug]);
    return toCamel(rows[0]) || null;
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const { name, slug, icon = '', color = '#000000', product_count = 0 } = dbData;
    await query(
      `INSERT INTO categories (id, name, slug, icon, color, product_count) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, slug, icon, color, product_count]
    );
    return this.findById(id);
  },

  async update(id, data) {
    const dbData = toDb(data);
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(dbData)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    await query(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async remove(id) {
    const result = await query('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
