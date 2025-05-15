import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Student } from '@/types/student.type';
import { useEffect, useState } from 'react';

interface StudentFormProps {
	onCancel: () => void;
	onSubmit: (values: Student) => void;
	defaultValues?: Student;
}

const hellworld = () => {
	console.log('object');
};

hellworld();

const StudentForm = ({
	onCancel,
	onSubmit,
	defaultValues,
}: StudentFormProps) => {
	console.log('🚀 ~ defaultValues:', defaultValues);
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [errollmentNumber, setErrollmentNumber] = useState<string>('');
	const [date, setDate] = useState<Date | undefined>(undefined);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const data: Student = {
			name,
			email,
			phone,
			errollNumber: errollmentNumber,
			dob: date,
			id: defaultValues ? defaultValues.id : Math.round(Math.random() * 100),
		};
		onSubmit(data);
		onCancel();
	};

	useEffect(() => {
		if (defaultValues) {
			setName(defaultValues.name);
			setEmail(defaultValues.email);
			setPhone(defaultValues.phone);
			setErrollmentNumber(defaultValues.errollNumber);
			setDate(defaultValues.dob);
		}
	}, [defaultValues]);

	return (
		<div className="max-w-2xl mx-auto p-6 rounded-lg shadow-sm border">
			<h2 className="text-2xl font-bold mb-6">
				{defaultValues ? 'Edit' : 'Add New'} Student{' '}
				{defaultValues ? `: ${defaultValues?.name}` : ''}
			</h2>

			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-2 gap-6">
					<div className="space-y-1">
						<Label>Name</Label>
						<Input
							type="text"
							placeholder="Enter student name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label>Email</Label>
						<Input
							type="text"
							placeholder="Enter email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label>Phone</Label>
						<Input
							type="text"
							placeholder="Enter phone number"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label>Enrollment Number</Label>
						<Input
							type="text"
							placeholder="Enter enrollment number"
							value={errollmentNumber}
							onChange={(e) => setErrollmentNumber(e.target.value)}
						/>
					</div>
					<div className="space-y-1">
						<Label>Date of admission</Label>
						<DatePicker date={date} setDate={setDate} />
					</div>
				</div>

				<div className="flex justify-end gap-6 mt-6">
					<Button variant={'outline'} onClick={() => onCancel()}>
						Cancel
					</Button>
					<Button className="bg-[#FEAF00] hover:bg-[#FEAF00] cursor-pointer">
						{defaultValues ? 'Edit student' : 'Add student'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default StudentForm;
