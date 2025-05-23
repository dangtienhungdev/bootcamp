import { studentApi } from '@/api/student.api';
import type { StudentTypeV2 } from '@/types/student-v2.type';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const StudentDetailPage = () => {
	const router = useParams();
	const studentId = router.studentId;

	const [student, setStudent] = useState<StudentTypeV2 | null>(null);

	// get student info
	useEffect(() => {
		const fetchStudent = async () => {
			if (studentId) {
				try {
					const response = await studentApi.detail(studentId);
					if (response.statusText === 'OK') {
						const student = response.data;
						setStudent(student);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		fetchStudent();
	}, [studentId]);

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
				<p>Name: {student?.name}</p>
				<p>Email: {student?.email}</p>
			</div>
		</div>
	);
};

export default StudentDetailPage;
