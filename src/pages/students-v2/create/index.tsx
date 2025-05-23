import { studentApi } from '@/api/student.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

// npm i zod react-hook-form @hookform/resolvers

const studentSchema = z.object({
	name: z.string().min(2),
	email: z.string().email({ message: 'Trường email là bắt buộc!' }),
});

const CreateStudentPage = () => {
	const navigate = useNavigate();

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
	} = form;

	const onSubmit = async (values: any) => {
		try {
			await studentApi.create(values);
			navigate('/students-v2');
		} catch (error) {
			console.log(error);
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
				<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							type="text"
							placeholder="Enter student name"
							{...register('name')}
						/>
						{errors?.name && (
							<span className="text-xs text-red-400">
								{errors.name.message}
							</span>
						)}
					</div>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input
							type="text"
							placeholder="Enter email address"
							{...register('email')}
						/>
						{errors?.email && (
							<span className="text-xs text-red-400">
								{errors.email.message}
							</span>
						)}
					</div>

					<Button className="bg-[#FEAF00] hover:bg-[#FEAF00]">
						Thêm mới học sinh
					</Button>
				</form>
			</div>
		</div>
	);
};

export default CreateStudentPage;
