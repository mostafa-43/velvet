import { v4 as uuidv4 } from 'uuid';
import { query } from '../config/database.js';
import { toDb, toCamel } from '../config/mapping.js';

export default {
  async findByProductId(productId) {
    return toCamel(await query('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order ASC', [productId]));
  },

  async create(data) {
    const id = uuidv4();
    const dbData = toDb(data);
    const { product_id, image_url, sort_order = 0 } = dbData;
    await query(
      `INSERT INTO product_images (id, product_id, image_url, sort_order) VALUES (?, ?, ?, ?)`,
      [id, product_id, image_url, sort_order]
    );
    const rows = await query('SELECT * FROM product_images WHERE id = ?', [id]);
    return toCamel(rows[0]);
  },

  async remove(id) {
    const result = await query('DELETE FROM product_images WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async removeByProductId(productId) {
    const result = await query('DELETE FROM product_images WHERE product_id = ?', [productId]);
    return result.affectedRows > 0;
  }
};
