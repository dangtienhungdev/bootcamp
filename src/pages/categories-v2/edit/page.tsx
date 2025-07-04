import { useCategory } from '@/contexts/category-context.context';

const EditCategoryPageV2 = () => {
	const { category } = useCategory();
	console.log('🚀 ~ EditCategoryPageV2 ~ category:', category);
	return <div>{category?.categoryName}</div>;
};

export default EditCategoryPageV2;
