import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '@/contexts/product-context.context';

/*
mục tiêu
1. Hiểu cách dùng "useContext" để chia sẻ state giữa các component
2. Tổ chức code theo rõ ràng
*/

const DemoPage = () => {
	const navigate = useNavigate();
	const { products, onDelete, onAdd, onEdit } = useProduct();

	const product = {
		name: 'Product 4',
		price: 400,
		image: 'https://via.placeholder.com/150',
	};

	return (
		<div className="p-10">
			<Button className="mb-10" onClick={() => onAdd(product)}>
				Add
			</Button>

			{products.map((product) => (
				<div
					key={product.id}
					className="flex justify-between gap-2 border border-gray-300 p-4"
				>
					<div className="">
						<h1 onClick={() => navigate(`/demo/detail/${product.id}`)}>
							{product.name}
						</h1>
						<p>{product.price}</p>
					</div>

					<div className="flex gap-2">
						<Button
							onClick={() =>
								onEdit(
									{ ...product, name: `${product.name} update` },
									product.id
								)
							}
						>
							Edit
						</Button>
						<Button onClick={() => onDelete(product.id)}>Delete</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export default DemoPage;
