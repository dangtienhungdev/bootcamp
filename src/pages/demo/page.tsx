import { useState } from 'react';

export type ProductDemo = {
	id: number;
	name: string;
	price: number;
	image: string;
};

const DemoPage = () => {
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

	// return <DemoDetailPage products={products} />;
	return <Child1 products={products} />;
};

export default DemoPage;

const Child1 = ({ products }: { products: ProductDemo[] }) => {
	return <Child2 products={products} />;
};

const Child2 = ({ products }: { products: ProductDemo[] }) => {
	return <Child3 products={products} />;
};

const Child3 = ({ products }: { products: ProductDemo[] }) => {
	return <Child4 products={products} />;
};

const Child4 = ({ products }: { products: ProductDemo[] }) => {
	console.log('🚀 ~ Child4 ~ products:', products);
	return <div>Child4</div>;
};
