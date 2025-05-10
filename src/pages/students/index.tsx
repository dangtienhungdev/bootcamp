import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

const StudentPage = () => {
	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<p className="text-2xl font-bold">Students List</p>

				<Button className="uppercase bg-[#FEAF00] hover:bg-[#e09d00] cursor-pointer">
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
						{Array.from({ length: 10 }).map((_, index) => {
							return (
								<tr key={index} className="border-b hover:bg-gray-50">
									<td className="py-3 px-4">
										<div className="flex items-center gap-3">
											<img
												src="https://picsum.photos/536/354"
												alt=""
												width={50}
												height={50}
												className="rounded-md"
											/>
											<span>Lorem, ipsum dolor.</span>
										</div>
									</td>
									<td className="py-3 px-4">karthi@gmmail.com</td>
									<td className="py-3 px-4">7305477760</td>
									<td className="py-3 px-4">1234567305477760</td>
									<td className="py-3 px-4">08-Dec, 2021</td>
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
