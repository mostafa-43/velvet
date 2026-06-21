import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(__dirname, '..', '..', env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subDir = 'general';
    if (req.baseUrl.includes('products')) subDir = 'products';
    else if (req.baseUrl.includes('brands')) subDir = 'brands';
    else if (req.baseUrl.includes('banners')) subDir = 'banners';
    cb(null, path.join(uploadDir, subDir));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg|mp4/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowed.test(file.mimetype.split('/')[1]);
  if (extOk || mimeOk) cb(null, true);
  else cb(new Error('Only images and MP4 files are allowed'), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.MAX_FILE_SIZE },
});
