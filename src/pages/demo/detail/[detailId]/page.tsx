import type { ProductDemo } from '../../page';

const DemoDetailPage = ({ products }: { products: ProductDemo[] }) => {
	console.log('🚀 ~ DemoPage ~ products:', products);

	return <div>DemoDetailPage</div>;
};

export default DemoDetailPage;
