import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM videos ORDER BY sort_order ASC'));
  },

  async findById(id) {
    const rows = await query('SELECT * FROM videos WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const {
      title, brand = '', thumbnail = null, duration = '0:00', views = '0', sort_order = 0
    } = dbData;
    await query(
      `INSERT INTO videos (id, title, brand, thumbnail, duration, views, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title, brand, thumbnail, duration, views, sort_order]
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
    await query(`UPDATE videos SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async remove(id) {
    const result = await query('DELETE FROM videos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
