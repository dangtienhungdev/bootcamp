import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import type { Category } from '@/types/category.type';
import { PencilIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TableCategoryProps {
	categories: Category[];
}

export const TableCategory = ({ categories }: TableCategoryProps) => {
	const navigate = useNavigate();

	const handleEditCategory = (categoryId: string) => {
		navigate(`/categories/edit/${categoryId}`);
	};

	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">STT</TableHead>
						<TableHead>Tên danh mục</TableHead>
						<TableHead>Mô tả</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Ngày tạo</TableHead>
						<TableHead>Cập nhật</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories.map((category: Category, index: number) => (
						<TableRow key={category.id}>
							<TableCell className="font-mono text-xs">#{index + 1}</TableCell>
							<TableCell>
								<div className="font-medium text-gray-900">
									{category.categoryName}
								</div>
							</TableCell>
							<TableCell>
								<div className="text-sm text-gray-600 max-w-xs">
									{category.description}
								</div>
							</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										category.isActive
											? 'bg-green-100 text-green-800'
											: 'bg-gray-100 text-gray-800'
									}`}
								>
									{category.isActive ? 'Hoạt động' : 'Không hoạt động'}
								</span>
							</TableCell>
							<TableCell className="text-sm text-gray-600">
								{new Date(category.createdAt).toLocaleDateString('vi-VN')}
							</TableCell>
							<TableCell className="text-sm text-gray-600">
								{new Date(category.updatedAt).toLocaleDateString('vi-VN')}
							</TableCell>
							<TableCell className="text-sm text-gray-600">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleEditCategory(category.id)}
								>
									<PencilIcon className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
