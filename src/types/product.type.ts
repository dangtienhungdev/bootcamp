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
	weight: number;
	material: string;
	stockQuantity: number;
	categoryId: string;
	category: Category;
	isFeatured: boolean;
	views: number;
	images: string[];
	createdAt: string;
	updatedAt: string;
}
