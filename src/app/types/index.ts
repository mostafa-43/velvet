export interface Brand {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  color: string;
  bgColor: string;
  logo: string;
  heroImage: string;
  productCount: number;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  ageRange: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  videoUrl?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgColor: string;
  textColor: string;
}

export interface Video {
  id: string;
  title: string;
  brand: string;
  thumbnail: string;
  duration: string;
  views: string;
}

export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}
