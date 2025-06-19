import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import type { Product } from '@/types/product.type';
import { formatPrice } from '@/lib/format-currency';

interface TableProductProps {
	products: Product[];
}

export const TableProduct = ({ products }: TableProductProps) => {
	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Tên sản phẩm</TableHead>
						<TableHead>Danh mục</TableHead>
						<TableHead>Giá</TableHead>
						<TableHead>Giá khuyến mãi</TableHead>
						<TableHead>Tồn kho</TableHead>
						<TableHead>Chất liệu</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product: Product, index: number) => (
						<TableRow key={product.id}>
							<TableCell className="font-mono text-xs">#{index + 1}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<img
										src={product.images[0]}
										alt={product.productName}
										className="w-20 h-20 rounded-md object-cover flex-shrink-0 border border-gray-300"
									/>
									<div>
										<div className="font-medium text-gray-900 truncate line-clamp-1 text-sm">
											{product.productName.slice(0, 40) + '...'}
										</div>
										<div className="text-sm text-gray-500 truncate line-clamp-2">
											{product.description.slice(0, 30) + '...'}
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell>
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
									{product.category.categoryName}
								</span>
							</TableCell>
							<TableCell className="font-medium">
								{formatPrice(product.price)}
							</TableCell>
							<TableCell>
								<div className="text-green-600 font-medium">
									{formatPrice(product.discountedPrice)}
								</div>
								{product.discountPercentage !== 0 && (
									<div className="text-xs text-red-500">
										{product.discountPercentage > 0 ? '+' : ''}
										{product.discountPercentage}%
									</div>
								)}
							</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										product.stockQuantity <= 10
											? 'bg-red-100 text-red-800'
											: product.stockQuantity <= 50
											? 'bg-yellow-100 text-yellow-800'
											: 'bg-green-100 text-green-800'
									}`}
								>
									{product.stockQuantity}
								</span>
							</TableCell>
							<TableCell className="text-sm text-gray-600">
								{product.material}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
