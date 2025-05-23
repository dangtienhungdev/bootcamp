import { studentApi } from '@/api/student.api';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const studentSchema = z.object({
	name: z.string().min(2),
	email: z.string().email({ message: 'Trường email là bắt buộc!' }),
});

const StudentEditPage = () => {
	const router = useParams();
	const navigate = useNavigate();
	const studentId = router.studentId;

	// form
	const form = useForm({
		resolver: zodResolver(studentSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = form;

	// get student info
	useEffect(() => {
		const fetchStudent = async () => {
			if (studentId) {
				try {
					const response = await studentApi.detail(studentId);
					if (response.statusText === 'OK') {
						const student = response.data;
						setValue('name', student.name);
						setValue('email', student.email);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		fetchStudent();
	}, [studentId]);

	const onSubmit = async (values: any) => {
		if (studentId) {
			try {
				await studentApi.update(studentId, values);
				navigate('/students-v2');
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<Link
				to={'/students-v2'}
				className="text-sm flex items-center gap-1 mb-10"
			>
				<ChevronLeft size={14} />
				Quay lại
			</Link>
			<div>
				<Form {...form}>
					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button className="bg-[#FEAF00] hover:bg-[#FEAF00]">
							Thêm mới học sinh
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default StudentEditPage;
