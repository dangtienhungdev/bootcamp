export interface Category {
  id: string;
  categoryName: string;
  description: string;
}

export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  discountedPrice: number;
  effectivePrice: number;
  discountPercentage: number;
  weight: number;
  material: string;
  stockQuantity: number;
  categoryId: string;
  category: Category;
  isFeatured: boolean;
  views: number;
  images: string[];
  discounts: any[];
  createdAt: string;
  updatedAt: string;
}