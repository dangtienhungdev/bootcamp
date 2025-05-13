import { Button } from '@/components/ui/button';
import type { Student } from '@/types/student.type';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import StudentForm from './components/student-form';

const StudentPage = () => {
	const [isAddingStudent, setIsAddingStudent] = useState<boolean>(true);
	const [students, setStudents] = useState<Student[]>([]);

	const onSubmit = (values: Student) => {
		console.log('🚀 ~ onSubmit ~ values:', values);
		setStudents((prev) => [...prev, values]);
	};

	// props, children
	return isAddingStudent ? (
		<StudentForm setIsAddingStudent={setIsAddingStudent} onSubmit={onSubmit} />
	) : (
		<div>
			<div className="flex justify-between items-center mb-6">
				<p className="text-2xl font-bold">Students List</p>

				<Button
					className="uppercase bg-[#FEAF00] hover:bg-[#e09d00] cursor-pointer"
					onClick={() => setIsAddingStudent(true)}
				>
					Add new student
				</Button>
			</div>

			<div>
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b">
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Name
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Email
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Phone
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Enroll Number
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Dob
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Actions
							</th>
						</tr>
					</thead>

					<tbody>
						{students.map((student, index) => {
							return (
								<tr key={student.id} className="border-b hover:bg-gray-50">
									<td className="py-3 px-4">
										<div className="flex items-center gap-3">
											<img
												src="https://picsum.photos/536/354"
												alt=""
												width={50}
												height={50}
												className="rounded-md"
											/>
											<span>{student.name}</span>
										</div>
									</td>
									<td className="py-3 px-4">{student.email}</td>
									<td className="py-3 px-4">{student.phone}</td>
									<td className="py-3 px-4">{student.errollNumber}</td>
									<td className="py-3 px-4">{student?.dob?.getTime()}</td>
									<td className="py-3 px-4">
										<div className="flex items-center gap-4">
											<button className="text-[#FEAF00] cursor-pointer">
												<Pencil className="size-5" />
											</button>

											<button className="text-red-500 cursor-pointer">
												<Trash2 className="size-5" />
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StudentPage;
