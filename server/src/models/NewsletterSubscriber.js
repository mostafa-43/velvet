import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC'));
  },

  async findByEmail(email) {
    const rows = await query('SELECT * FROM newsletter_subscribers WHERE email = ?', [email]);
    return toCamel(rows[0]) || null;
  },

  async create(email) {
    const id = uuidv4();
    await query(
      `INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)`,
      [id, email]
    );
    const rows = await query('SELECT * FROM newsletter_subscribers WHERE id = ?', [id]);
    return toCamel(rows[0]);
  },

  async remove(id) {
    const result = await query('DELETE FROM newsletter_subscribers WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
