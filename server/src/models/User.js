import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findByEmail(email) {
    const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
    return toCamel(rows[0]) || null;
  },

  async findById(id) {
    const rows = await query('SELECT * FROM users WHERE id = ?', [id]);
    return toCamel(rows[0]) || null;
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const { name, email, password, role = 'admin' } = dbData;
    await query(
      `INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)`,
      [id, name, email, password, role]
    );
    return this.findById(id);
  }
};
