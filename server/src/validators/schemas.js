import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const brandSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  tagline: z.string().max(200).optional().default(''),
  description: z.string().optional().default(''),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid color hex').optional().default('#000000'),
  bgColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid bgColor hex').optional().default('#f0f0f0'),
  logo: z.string().max(500).optional().default(''),
  heroImage: z.string().max(500).optional().default(''),
  featured: z.union([z.boolean(), z.number()]).optional().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100),
  icon: z.string().max(10).optional().default(''),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid color hex').optional().default('#000000'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  brandId: z.string().min(1, 'Brand is required'),
  categoryId: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  originalPrice: z.number().positive().optional().nullable(),
  description: z.string().optional().default(''),
  features: z.array(z.string()).optional().default([]),
  ageRange: z.string().optional().default('3+'),
  rating: z.number().min(0).max(5).optional().default(0),
  reviewCount: z.number().int().min(0).optional().default(0),
  isNew: z.union([z.boolean(), z.number()]).optional().default(false),
  isTrending: z.union([z.boolean(), z.number()]).optional().default(false),
  isFeatured: z.union([z.boolean(), z.number()]).optional().default(false),
  videoUrl: z.string().max(500).optional().nullable(),
  inStock: z.union([z.boolean(), z.number()]).optional().default(true),
});

export const bannerSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  subtitle: z.string().max(300).optional().default(''),
  ctaText: z.string().max(100).optional().default('Shop Now'),
  ctaLink: z.string().max(500).optional().default('/products'),
  image: z.string().max(500).optional().default(''),
  bgColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid color hex').optional().default('#0d1b4b'),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid color hex').optional().default('#ffffff'),
  active: z.union([z.boolean(), z.number()]).optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const videoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  brand: z.string().max(100).optional().default(''),
  thumbnail: z.string().max(500).optional().default(''),
  duration: z.string().max(10).optional().default('0:00'),
  views: z.string().max(20).optional().default('0'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
  subject: z.string().max(200).optional().default(''),
  message: z.string().min(1, 'Message is required'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const settingSchema = z.object({
  value: z.string(),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});
