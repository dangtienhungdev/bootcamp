import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context.context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
	usernameOrEmail: z.string().min(1, 'Vui lòng nhập tên đăng nhập hoặc email'),
	password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	// const { mutate: loginMutation, isPending } = useLogin();
	const { isAuthenticated, login } = useAuth();

	const from = location.state?.from?.pathname || '/products';

	const form = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			usernameOrEmail: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginForm) => {
		try {
			setIsSubmitting(true);
			login(data);
			navigate('/products', { replace: true });
		} catch (error) {
			// Error is handled in AuthContext
		} finally {
			setIsSubmitting(false);
		}
	};

	// if (isPending) {
	// 	return (
	// 		<div className="min-h-screen flex items-center justify-center">
	// 			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
	// 		</div>
	// 	);
	// }

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#B87A1F]">
						<svg
							className="h-8 w-8 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Đăng nhập Admin
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Vui lòng đăng nhập để truy cập hệ thống quản trị
					</p>
				</div>

				<div className="bg-white py-8 px-6 shadow rounded-lg">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="usernameOrEmail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên đăng nhập hoặc Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Nhập tên đăng nhập hoặc email"
												disabled={isSubmitting}
												className="h-12"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mật khẩu</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													type={showPassword ? 'text' : 'password'}
													placeholder="Nhập mật khẩu"
													disabled={isSubmitting}
													className="h-12 pr-10"
												/>
												<button
													type="button"
													className="absolute inset-y-0 right-0 pr-3 flex items-center"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? (
														<EyeOffIcon className="h-4 w-4 text-gray-400" />
													) : (
														<EyeIcon className="h-4 w-4 text-gray-400" />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full h-12 bg-[#B87A1F] hover:bg-[#A16B1A] text-white font-medium"
							>
								{isSubmitting ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Đang đăng nhập...
									</>
								) : (
									'Đăng nhập'
								)}
							</Button>
						</form>
					</Form>
				</div>

				<div className="text-center">
					<p className="text-xs text-gray-500">
						© 2024 Jewelry Shop Admin. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
