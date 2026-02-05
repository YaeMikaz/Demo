export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  link: string;
}

export interface FlashSale {
  id: string;
  product: Product;
  originalPrice: number;
  salePrice: number;
  endTime: Date;
  stockLeft: number;
}

export type ViewMode = 'grid' | 'list';

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  sortBy: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
