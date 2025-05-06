import { useEffect, useState } from 'react';
import { Link } from 'react-router';

type Geolocation = {
	lat: string;
	lng: string;
};

type Address = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geolocation;
};

type Company = {
	name: string;
	catchPhrase: string;
	bs: string;
};

export type IUser = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
};

export const API_URL = 'https://jsonplaceholder.typicode.com/users';

const HomePage = () => {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data: IUser[]) => setUsers(data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="max-w-lg mx-auto space-y-4">
			{users.map((user) => {
				return (
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
				);
			})}
		</div>
	);
};

export default HomePage;

// axios -> zustand & redux toolkit
