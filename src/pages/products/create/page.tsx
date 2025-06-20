import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
import type { Product } from '@/types/product.type';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { productsApi } from '@/apis/products.api';
import { toast } from 'sonner';
import { useCategory } from '@/hooks/categories/useCategory';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
	productName: z
		.string()
		.min(1, { message: 'Tên sản phẩm không được để trống' }),
	description: z.string().optional(),
	// .min(1, { message: 'Mô tả sản phẩm không được để trống' }),
	price: z.number().min(1, { message: 'Giá sản phẩm không được để trống' }),
	discountedPrice: z.number().optional(),
	weight: z
		.number()
		.min(1, { message: 'Trọng lượng sản phẩm không được để trống' }),
	material: z
		.string()
		.min(1, { message: 'Vật liệu sản phẩm không được để trống' }),
	stockQuantity: z
		.number()
		.min(1, { message: 'Số lượng sản phẩm không được để trống' }),
	categoryId: z
		.string()
		.min(1, { message: 'Danh mục sản phẩm không được để trống' }),
	isFeatured: z.boolean().default(false).optional(),
	images: z.string().min(1, { message: 'Ảnh sản phẩm không được để trống' }),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateProductPage = () => {
	const navigate = useNavigate();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			productName: '',
			description: '',
			price: 0,
			discountedPrice: 0,
			weight: 0,
			material: '',
			stockQuantity: 0,
			categoryId: '',
			isFeatured: false,
			images: '',
		},
	});

	const materials = [
		'Vàng 24k',
		'Vàng 18k',
		'Vàng 14k',
		'Bạc 925',
		'Bạc 999',
		'Kim cương',
		'Ngọc trai',
		'Đá quý',
		'Khác',
	];

	// get categories
	const { categories } = useCategory({ limit: 100 });

	// create product muation
	const createProductMutation = useMutation({
		mutationKey: [productsApi.createProduct.name],
		mutationFn: (data: Partial<Product>) => productsApi.createProduct(data),
	});

	const onSubmit = (data: FormSchema) => {
		createProductMutation.mutate(
			{
				...data,
				images: [data.images],
			},
			{
				onSuccess: () => {
					toast.success('Thêm sản phẩm thành công');
					form.reset();
					navigate('/products');
				},
				onError: () => {
					toast.error('Thêm sản phẩm thất bại');
				},
			}
		);
	};

	return (
		<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm sản phẩm</h1>
				<p className="text-gray-600">Quản lý và xem thông tin các sản phẩm</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="productName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên sản phẩm</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhẫn Kim cương Solitaire 1 carat"
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
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Danh mục sản phẩm</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full !h-14">
												<SelectValue placeholder="Chọn danh mục" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories &&
												categories.length > 0 &&
												categories.map((category) => (
													<SelectItem key={category.id} value={category.id}>
														{category.categoryName}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá sản phẩm</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="45000000"
											{...field}
											className="w-full h-14"
											onChange={(e) => {
												field.onChange(Number(e.target.value));
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="discountedPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá khuyến mãi</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="42000000"
											{...field}
											className="w-full h-14"
											onChange={(e) => {
												field.onChange(Number(e.target.value));
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="weight"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Trọng lượng sản phẩm (gram)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="10"
											{...field}
											className="w-full h-14"
											onChange={(e) => {
												field.onChange(Number(e.target.value));
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="material"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Vật liệu sản phẩm</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full !h-14">
													<SelectValue placeholder="Chọn vật liệu" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{materials &&
													materials.length > 0 &&
													materials.map((material) => (
														<SelectItem key={material} value={material}>
															{material}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="stockQuantity"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số lượng sản phẩm</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="100"
											{...field}
											className="w-full h-14"
											onChange={(e) => {
												field.onChange(Number(e.target.value));
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isFeatured"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sản phẩm nổi bật</FormLabel>
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
					</div>
					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="images"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ảnh sản phẩm</FormLabel>
									<FormControl>
										<Input
											placeholder="https://example.com/image.jpg"
											{...field}
											className="w-full h-14"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mô tả sản phẩm</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Mô tả sản phẩm"
											{...field}
											className="w-full h-40"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type="submit"
						disabled={createProductMutation.isPending}
						className="w-full h-14 flex items-center justify-center"
					>
						{createProductMutation.isPending && (
							<Loader className="animate-spin mr-2" />
						)}
						{createProductMutation.isPending ? 'Đang thêm...' : 'Thêm sản phẩm'}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CreateProductPage;
