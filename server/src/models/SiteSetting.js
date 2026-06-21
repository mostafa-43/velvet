import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM site_settings ORDER BY setting_key ASC'));
  },

  async findByKey(key) {
    const rows = await query('SELECT * FROM site_settings WHERE setting_key = ?', [key]);
    return toCamel(rows[0]) || null;
  },

  async update(key, value) {
    const existing = await this.findByKey(key);
    if (existing) {
      await query('UPDATE site_settings SET setting_value = ? WHERE setting_key = ?', [value, key]);
    } else {
      const id = uuidv4();
      await query(
        `INSERT INTO site_settings (id, setting_key, setting_value) VALUES (?, ?, ?)`,
        [id, key, value]
      );
    }
    return this.findByKey(key);
  }
};
