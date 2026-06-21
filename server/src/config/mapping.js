const camelToSnakeMap = {
  brandId: 'brand_id',
  categoryId: 'category_id',
  originalPrice: 'original_price',
  ageRange: 'age_range',
  reviewCount: 'review_count',
  isNew: 'is_new',
  isTrending: 'is_trending',
  isFeatured: 'is_featured',
  videoUrl: 'video_url',
  inStock: 'in_stock',
  bgColor: 'bg_color',
  heroImage: 'hero_image',
  productCount: 'product_count',
  ctaText: 'cta_text',
  ctaLink: 'cta_link',
  textColor: 'text_color',
  sortOrder: 'sort_order',
  isRead: 'is_read',
  settingKey: 'setting_key',
  settingValue: 'setting_value',
  productId: 'product_id',
  imageUrl: 'image_url',
};

const snakeToCamelMap = Object.fromEntries(
  Object.entries(camelToSnakeMap).map(([k, v]) => [v, k])
);

export function toDb(data) {
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    result[camelToSnakeMap[key] || key] = value;
  }
  return result;
}

export function toCamel(data) {
  if (!data) return data;
  if (Array.isArray(data)) return data.map(toCamel);
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    result[snakeToCamelMap[key] || key] = value;
  }
  return result;
}
