import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { categoriesApi } from '@/apis/categories.api';
import { toast } from 'sonner';
import { useCategory } from '@/hooks/categories/useCategory';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	categoryName: z.string().min(1),
	description: z.string().min(1),
	isActive: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

const EditCategoryPage = () => {
	const navigate = useNavigate();
	const { category } = useCategory();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			categoryName: '',
			description: '',
			isActive: false,
		},
	});

	// edit category
	const editCategoryMutation = useMutation({
		mutationKey: [categoriesApi.updateCategory.name, category?.id],
		mutationFn: (values: FormSchema) =>
			categoriesApi.updateCategory(category?.id as string, values),
	});

	const onSubmit = (values: FormSchema) => {
		editCategoryMutation.mutate(values, {
			onSuccess: () => {
				toast.success('Cập nhật danh mục thành công');
				navigate('/categories');
			},
			onError: () => {
				toast.error('Cập nhật danh mục thất bại');
			},
		});
	};

	useEffect(() => {
		if (category) {
			form.setValue('categoryName', category.categoryName);
			form.setValue('description', category.description);
			form.setValue('isActive', category.isActive);
		}
	}, [form, category]);

	return (
		<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Chỉnh sửa danh mục
				</h1>
				<p className="text-gray-600">Quản lý và xem thông tin các danh mục</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="categoryName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên danh mục</FormLabel>
								<FormControl>
									<Input
										placeholder="Nhẫn Kim cương"
										className="w-full h-14"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isActive"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Trạng thái</FormLabel>
								<FormControl>
									<Switch
										checked={field.value ?? false}
										onCheckedChange={field.onChange}
									></Switch>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mô tả danh mục</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Mô tả danh mục"
										{...field}
										className="w-full h-40"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						disabled={editCategoryMutation.isPending}
						className="w-full h-14 flex items-center justify-center"
					>
						{editCategoryMutation.isPending && (
							<Loader className="animate-spin mr-2" />
						)}
						{editCategoryMutation.isPending
							? 'Đang cập nhật...'
							: 'Cập nhật danh mục'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default EditCategoryPage;
