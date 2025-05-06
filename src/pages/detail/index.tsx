import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { API_URL, IUser } from '../home';

const DetailPage = () => {
	const params = useParams();
	const { userId } = params;

	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		if (userId) {
			fetch(`${API_URL}/${userId}`)
				.then((res) => res.json())
				.then((data: IUser) => setUser(data))
				.catch((error) => console.log(error));
		}
	}, []);

	if (!user) {
		return <div>loading...</div>;
	}

	return (
		<div className="max-w-lg mx-auto space-y-4">
			<div
				key={user.id}
				className="flex cursor-pointer gap-6 shadow p-4 rounded-lg border hover:shadow-md transition-all"
			>
				<div className="flex flex-col gap-2 flex-1 justify-center">
					<Link to={`/detail/${user.id}`}>
						<p className="font-medium text-lg">{user.name}</p>
					</Link>
					<p className="">{user.email}</p>
				</div>
				<button
					className="text-red-400"
					// onClick={() => handleDelete(user.id)}
				>
					Xoá
				</button>
			</div>
		</div>
	);
};

export default DetailPage;
