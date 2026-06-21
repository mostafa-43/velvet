import path from 'path';
import { env } from '../config/env.js';

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const url = `/${env.UPLOAD_DIR}/${req.file.filename}`;
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function uploadMultiple(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const urls = req.files.map(file => `/${env.UPLOAD_DIR}/${file.filename}`);
    res.json({ urls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
