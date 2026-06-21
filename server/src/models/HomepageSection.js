import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM homepage_sections ORDER BY sort_order ASC'));
  },

  async findById(id) {
    const rows = await query('SELECT * FROM homepage_sections WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
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
    await query(`UPDATE homepage_sections SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  }
};
