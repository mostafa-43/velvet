import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';

import brandRoutes from './routes/brands.js';
import categoryRoutes from './routes/categories.js';
import productRoutes from './routes/products.js';
import bannerRoutes from './routes/banners.js';
import videoRoutes from './routes/videos.js';
import homepageRoutes from './routes/homepage.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import authRoutes from './routes/auth.js';

import adminBrandRoutes from './routes/admin/adminBrands.js';
import adminCategoryRoutes from './routes/admin/adminCategories.js';
import adminProductRoutes from './routes/admin/adminProducts.js';
import adminBannerRoutes from './routes/admin/adminBanners.js';
import adminHomepageRoutes from './routes/admin/adminHomepage.js';
import adminContactRoutes from './routes/admin/adminContact.js';
import adminNewsletterRoutes from './routes/admin/adminNewsletter.js';
import adminSettingsRoutes from './routes/admin/adminSettings.js';
import adminUploadRoutes from './routes/admin/adminUpload.js';
import adminAuthRoutes from './routes/admin/adminAuth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  app.use('/api/brands', brandRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/banners', bannerRoutes);
  app.use('/api/videos', videoRoutes);
  app.use('/api/homepage', homepageRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/newsletter', newsletterRoutes);
  app.use('/api/auth', authRoutes);

  app.use('/api/admin/brands', adminBrandRoutes);
  app.use('/api/admin/categories', adminCategoryRoutes);
  app.use('/api/admin/products', adminProductRoutes);
  app.use('/api/admin/banners', adminBannerRoutes);
  app.use('/api/admin/homepage', adminHomepageRoutes);
  app.use('/api/admin/contact', adminContactRoutes);
  app.use('/api/admin/newsletter', adminNewsletterRoutes);
  app.use('/api/admin/settings', adminSettingsRoutes);
  app.use('/api/admin/upload', adminUploadRoutes);
  app.use('/api/admin/auth', adminAuthRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    if (err.name === 'MulterError') {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    res.status(500).json({ error: err.message || 'Internal server error' });
  });

  return app;
}
