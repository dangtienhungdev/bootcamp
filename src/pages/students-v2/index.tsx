/*
id: string,
name: string,
email: string
*/

import { studentApi } from '@/api/student.api';
import type { StudentTypeV2 } from '@/types/student-v2.type';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentPageV2 = () => {
	const [students, setStudents] = useState<StudentTypeV2[]>([]);

	useEffect(() => {
		// get all students
		const fetchStudent = async () => {
			try {
				const response = await studentApi.getAll();
				if (response.statusText === 'OK') setStudents(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchStudent();
	}, []);

	// handle delete
	const handleDeleteStudent = async (id: string) => {
		try {
			const response = await studentApi.delete(id);
			console.log('🚀 ~ handleDeleteStudent ~ response:', response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Link
				to={'/students-v2/create'}
				className="mb-10 border bg-[#FEAF00] text-white py-2 px-4 rounded-md inline-block"
			>
				Thêm học sinh
			</Link>
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
							Actions
						</th>
					</tr>
				</thead>

				<tbody>
					{students.map((student) => {
						return (
							<tr className="border-b hover:bg-gray-50" key={student.id}>
								<td className="py-3 px-4">
									<Link to={`/students-v2/detail/${student.id}`}>
										{student.name}
									</Link>
								</td>
								<td className="py-3 px-4">{student.email}</td>

								<td className="py-3 px-4">
									<div className="flex items-center gap-4">
										<Link to={`/students-v2/edit/${student.id}`}>
											<button className="text-[#FEAF00] cursor-pointer">
												<Pencil className="size-5" />
											</button>
										</Link>

										<button
											className="text-red-500 cursor-pointer"
											onClick={() => handleDeleteStudent(student.id)}
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
	);
};

export default StudentPageV2;
