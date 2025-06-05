import { getAllUser } from '@/apis/user.api';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	// get: -> useQuery
	// post/put/delete/patch: -> useMutation

	const result = useQuery({
		queryKey: ['get-user'],
		queryFn: getAllUser,
	});
	const { data: users, isError, isLoading } = result;

	if (isLoading) {
		return <p>Loading.....</p>;
	}

	if (isError) {
		return <div>Error!</div>;
	}

	return (
		<div className="p-10">
			<Button>Add User</Button>

			<div className="mt-10">
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
								Age
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-500">
								Actions
							</th>
						</tr>
					</thead>

					<tbody>
						{users &&
							users.length > 0 &&
							users.map((user) => {
								return (
									<tr className="border-b hover:bg-gray-50" key={user.id}>
										<td className="py-3 px-4">
											<Link to={`/user/detail/${user.id}`}>{user.name}</Link>
										</td>
										<td className="py-3 px-4">{user.email}</td>
										<td className="py-3 px-4">{user.age}</td>

										<td className="py-3 px-4">
											<div className="flex items-center gap-4">
												<Link to={`/edit/`}>
													<button className="text-[#FEAF00] cursor-pointer">
														<Pencil className="size-5" />
													</button>
												</Link>

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

export default HomePage;
