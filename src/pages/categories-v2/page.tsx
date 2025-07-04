import { useCategory } from '@/contexts/category-context.context';
import { TableCategory } from '../categories/components/table';

const CategoryPageV2 = () => {
	const { categories, handleDetailCategory } = useCategory();

	return (
		<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<TableCategory categories={categories} abc={handleDetailCategory} />
		</div>
	);
};

export default CategoryPageV2;
