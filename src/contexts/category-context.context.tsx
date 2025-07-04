import { createContext, useContext, useEffect, useState } from 'react';

import { useCategories } from '@/hooks/categories/useCategory';
import type { Category } from '@/types/category.type';

interface CategoryContextType {
	categories: Category[];
	category: Category | null;
	handleDetailCategory: (categoryId: string) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [category, setCategory] = useState<Category | null>(null);

	const { categories: categoryList } = useCategories();

	const handleDetailCategory = (categoryId: string) => {
		const category = categoryList.find(
			(category) => category.id === categoryId
		);
		if (category) setCategory(category);
	};
	useEffect(() => {
		if (categoryList && categoryList.length > 0) setCategories(categoryList);
	}, [categoryList]);

	return (
		<CategoryContext.Provider
			value={{ categories, category, handleDetailCategory }}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategory = () => {
	const context = useContext(CategoryContext);

	if (context === null) {
		throw new Error('useCategory must be used within a CategoryProvider');
	}

	return context;
};
