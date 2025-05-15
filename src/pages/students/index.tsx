import { Button } from '@/components/ui/button';
import type { Student } from '@/types/student.type';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import StudentForm from './components/student-form';

const StudentPage = () => {
	const [isAddingStudent, setIsAddingStudent] = useState<boolean>(true);
	const [students, setStudents] = useState<Student[]>([]);
	const [editingStudent, setEditingStudent] = useState<Student | null>(null);

	const onSubmit = (values: Student) => {
		if (editingStudent) {
			// handle update
			const updateStudents = students.map((student) =>
				student.id === editingStudent.id ? values : student
			);
			setStudents(updateStudents);
		} else {
			// handle add
			setStudents((prev) => [...prev, values]);
		}
	};

	// delete student
	const handleDelete = (student: Student) => {
		const deleteItem = students.filter(
			(studentItem) => studentItem.id !== student.id
		);
		setStudents(deleteItem);
	};

	const handleUserInfo = (student: Student) => {
		setEditingStudent(student);
	};

	// props, children
	return isAddingStudent ? (
		<StudentForm
			onCancel={() => setIsAddingStudent(false)}
			onSubmit={onSubmit}
		/>
	) : editingStudent ? (
		<StudentForm
			onCancel={() => setEditingStudent(null)}
			onSubmit={onSubmit}
			defaultValues={editingStudent}
		/>
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
						{students.map((student) => {
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
									<td className="py-3 px-4">
										{format(student?.dob || '', 'dd/MM/yyyy')}
									</td>
									<td className="py-3 px-4">
										<div className="flex items-center gap-4">
											<button
												className="text-[#FEAF00] cursor-pointer"
												onClick={() => handleUserInfo(student)}
											>
												<Pencil className="size-5" />
											</button>

											<button
												className="text-red-500 cursor-pointer"
												onClick={() => handleDelete(student)}
											>
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
