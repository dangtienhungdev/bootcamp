import { useParams } from 'react-router-dom';
import { useProduct } from '@/contexts/product-context.context';

const DemoDetailPage = () => {
	const { onDetail } = useProduct();
	const { detailId } = useParams();

	const product = onDetail(Number(detailId));
	console.log('🚀 ~ DemoDetailPage ~ product:', product);

	return (
		<div>
			<h1>{product?.name}</h1>
			<p>{product?.price}</p>
			<p>{product?.image}</p>
		</div>
	);
};

export default DemoDetailPage;
