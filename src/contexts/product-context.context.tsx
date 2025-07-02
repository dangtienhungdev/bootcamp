import { createContext, useContext, useState } from 'react';

import type { ProductDemo } from '@/types/product.type';

interface ProductContextType {
	products: ProductDemo[];
	onDelete: (id: number) => void;
	onAdd: (product: Omit<ProductDemo, 'id'>) => void;
	onEdit: (product: ProductDemo, id: number) => void;
	onDetail: (id: number) => ProductDemo | undefined;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const produtList: ProductDemo[] = [
		{
			id: 1,
			name: 'Product 1',
			price: 100,
			image: 'https://via.placeholder.com/150',
		},
		{
			id: 2,
			name: 'Product 2',
			price: 200,
			image: 'https://via.placeholder.com/150',
		},
		{
			id: 3,
			name: 'Product 3',
			price: 300,
			image: 'https://via.placeholder.com/150',
		},
	];

	const [products, setproducts] = useState<ProductDemo[]>(produtList);

	const handleDelete = (id: number) => {
		const newProducts = products.filter((productItem) => productItem.id !== id);
		setproducts(newProducts);
	};

	const handleAdd = (product: Omit<ProductDemo, 'id'>) => {
		const id = products.length + 1;
		const newProduct = { id, ...product };
		setproducts([...products, newProduct]);
	};

	const handleEdit = (product: ProductDemo, id: number) => {
		const newProducts = products.map((productItem) => {
			if (productItem.id === id) {
				return product;
			}
			return productItem;
		});
		setproducts(newProducts);
	};

	const handleDetail = (id: number): ProductDemo | undefined => {
		return products.find((product) => product.id === id);
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				onDelete: handleDelete,
				onAdd: handleAdd,
				onEdit: handleEdit,
				onDetail: handleDetail,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => {
	const context = useContext(ProductContext);

	if (context === null) {
		throw new Error('useProduct must be used within a ProductProvider');
	}

	return context;
};
