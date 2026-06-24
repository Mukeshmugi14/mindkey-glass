export type ProductType = 'Digital Product' | 'Course' | 'Bundle';

export interface Product {
  id: string;
  type: ProductType;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  rating?: number;
  sales?: number;
  badge?: 'Best Seller' | 'Best Deal';
  itemsIncluded?: number;
}

export interface Testimonial {
  id: string;
  author: string;
  date: string;
  content: string;
}
