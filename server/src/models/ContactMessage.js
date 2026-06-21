import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findAll() {
    return toCamel(await query('SELECT * FROM contact_messages ORDER BY created_at DESC'));
  },

  async findById(id) {
    const rows = await query('SELECT * FROM contact_messages WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const { name, email, subject = null, message } = dbData;
    await query(
      `INSERT INTO contact_messages (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, subject, message]
    );
    return this.findById(id);
  },

  async markAsRead(id) {
    await query('UPDATE contact_messages SET is_read = 1 WHERE id = ?', [id]);
    return this.findById(id);
  },

  async remove(id) {
    const result = await query('DELETE FROM contact_messages WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
