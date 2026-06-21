import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findAll(activeOnly = false) {
    if (activeOnly) {
      return toCamel(await query('SELECT * FROM banners WHERE active = 1 ORDER BY sort_order ASC'));
    }
    return toCamel(await query('SELECT * FROM banners ORDER BY sort_order ASC'));
  },

  async findById(id) {
    const rows = await query('SELECT * FROM banners WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const {
      title, subtitle = null, cta_text = 'Shop Now', cta_link = '/products',
      image = null, bg_color = '#0d1b4b', text_color = '#ffffff', sort_order = 0, active = 1
    } = dbData;
    await query(
      `INSERT INTO banners (id, title, subtitle, cta_text, cta_link, image, bg_color, text_color, sort_order, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, subtitle, cta_text, cta_link, image, bg_color, text_color, sort_order, active]
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
    await query(`UPDATE banners SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async remove(id) {
    const result = await query('DELETE FROM banners WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
