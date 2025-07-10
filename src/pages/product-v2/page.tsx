import type { CreateProductBody, ProductV2 } from '@/types/product-v2.type';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	useCreateProductMutation,
	useGetProductsQuery,
} from '@/services/product.service';

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format-currency';

const ProductPageV2 = () => {
	const { data, isLoading } = useGetProductsQuery();
	const [createProduct] = useCreateProductMutation();

	const products = data?.docs;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleCreateProduct = () => {
		const productBody: CreateProductBody = {
			name: `Sản phẩm ${products?.length ? products.length + 1 : 1}`,
			description:
				'<li><strong>OTIS CLUB</strong> sẽ giúp bạn giải quyết vấn đề giá thành, chất lượng và mẫu mã sản phẩm tốt nhất.</li>',
			price: 150000,
			category: '67d5c818ab5ab468f2887259',
			discountPrice: 100000,
			variants: [
				{
					color: 'Đỏ',
					sizes: [
						{ size: 'S', quantity: 10 },
						{ size: 'M', quantity: 5 },
					],
				},
				{
					color: 'Xanh',
					sizes: [
						{ size: 'S', quantity: 8 },
						{ size: 'M', quantity: 3 },
						{ size: 'L', quantity: 2 },
					],
				},
			],
			isActive: true,
			thumbnail:
				'https://thieuhoa.com.vn/wp-content/uploads/2022/07/9Qsuh31vTqEabWaOS4GKhFp1IeOdg2gqGZatKDCa.webp',
		};

		createProduct(productBody);
	};

	return (
		<div className="p-10">
			<div className="flex justify-end items-center mb-10">
				<Button size="lg" onClick={handleCreateProduct}>
					Thêm sản phẩm
				</Button>
			</div>

			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">ID</TableHead>
							<TableHead>Tên sản phẩm</TableHead>
							<TableHead>Danh mục</TableHead>
							<TableHead>Giá</TableHead>
							<TableHead>Giá khuyến mãi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products &&
							products.length > 0 &&
							products.map((product: ProductV2, index: number) => (
								<TableRow key={product._id}>
									<TableCell className="font-mono text-xs">
										#{index + 1}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<img
												src={product.thumbnail}
												alt={product.name}
												className="w-20 h-20 rounded-md object-cover flex-shrink-0 border border-gray-300"
											/>
											<div>
												<div className="font-medium text-gray-900 truncate line-clamp-1 text-sm">
													{product.name.slice(0, 40) + '...'}
												</div>
												<div
													className="text-sm text-gray-500 truncate line-clamp-2"
													dangerouslySetInnerHTML={{
														__html: product.description.slice(0, 30) + '...',
													}}
												/>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{product.category?.name}
										</span>
									</TableCell>
									<TableCell className="font-medium">
										{formatPrice(product.price)}
									</TableCell>
									<TableCell>
										<div className="text-green-600 font-medium">
											{formatPrice(product.price - product.discountPrice)}
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ProductPageV2;
