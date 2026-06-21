import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM brands ORDER BY name ASC'));
  },

  async findById(id) {
    const rows = await query('SELECT * FROM brands WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
  },

  async findBySlug(slug) {
    const rows = await query('SELECT * FROM brands WHERE slug = ?', [slug]);
    return toCamel(rows[0]) || null;
  },

  async findFeatured() {
    return toCamel(await query('SELECT * FROM brands WHERE featured = 1 ORDER BY name ASC'));
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const { name, slug, tagline = '', description = null, color = '#000000', bg_color = '#f0f0f0', logo = null, hero_image = null, product_count = 0, featured = 0 } = dbData;
    await query(
      `INSERT INTO brands (id, name, slug, tagline, description, color, bg_color, logo, hero_image, product_count, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, slug, tagline, description, color, bg_color, logo, hero_image, product_count, featured]
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
    await query(`UPDATE brands SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async remove(id) {
    const result = await query('DELETE FROM brands WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async search(searchQuery) {
    return toCamel(await query('SELECT * FROM brands WHERE name LIKE ? OR tagline LIKE ? ORDER BY name ASC', [`%${searchQuery}%`, `%${searchQuery}%`]));
  }
};
