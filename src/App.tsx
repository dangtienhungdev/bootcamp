// virtual DOM so với DOM
// DOM ảo, react

import { useState } from 'react';

type User = {
	id: number;
	email: string;
	username: string;
	avatar: string;
	phone: string;
};

// omit -> loại bỏ 1 trường k dùng đến
type UserInfo = Omit<User, 'id'>;

const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [userInfo, setUserInfo] = useState<UserInfo>({
		username: '',
		email: '',
		avatar: '',
		phone: '',
	});

	const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevData) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newUsers = [
			...users,
			{
				...userInfo,
				id: users.length + 1, // tạo mới id cho user
			},
		];
		setUsers(newUsers);

		setUserInfo({
			username: '',
			email: '',
			avatar: '',
			phone: '',
		});
	};

	// hàm xoá user
	const handleDelete = (id: number) => {
		const filteredUser = users.filter((user) => {
			console.log(user);
			return user.id !== id;
		});
		setUsers(filteredUser);
	};

	return (
		<div className="p-10 grid grid-cols-2 gap-10">
			{/* left form */}
			<div>
				<h2 className="text-center text-2xl font-semibold">Form Add User</h2>
				<form
					autoComplete="off"
					className="space-y-6 mt-6"
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className="flex flex-col gap-1">
						<label className="text-sm" htmlFor="username">
							Tên nhân viên
						</label>
						<input
							className="border p-2 rounded-md outline-none"
							type="text"
							name="username"
							id="username"
							value={userInfo.username}
							onChange={(e) => handleChangeUsername(e)}
							placeholder="Tên nhân viên"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm" htmlFor="email">
							Email
						</label>
						<input
							className="border p-2 rounded-md outline-none"
							type="email"
							name="email"
							id="email"
							value={userInfo.email}
							onChange={(e) => handleChangeUsername(e)}
							placeholder="Email"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm" htmlFor="phone">
							Phone
						</label>
						<input
							className="border p-2 rounded-md outline-none"
							type="tel"
							name="phone"
							id="phone"
							value={userInfo.phone}
							onChange={(e) => handleChangeUsername(e)}
							placeholder="Phone"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm" htmlFor="avatar">
							Avatar
						</label>
						<input
							className="border p-2 rounded-md outline-none"
							type="text"
							name="avatar"
							id="avatar"
							value={userInfo.avatar}
							onChange={(e) => handleChangeUsername(e)}
							placeholder="Link"
						/>
					</div>

					<div className="flex items-center justify-center">
						<button className="bg-blue-400 px-8 mx-auto py-3 text-white hover:bg-blue-500 text-center rounded-lg">
							Thêm người dùng
						</button>
					</div>
				</form>
			</div>
			{/* rignt list */}
			<div>
				<h2 className="text-center text-2xl font-semibold">Danh sách user</h2>

				<div className="space-y-6 mt-6">
					{users.length === 0 && (
						<div className="italic text-center">Danh sách trống</div>
					)}
					{users &&
						users.length > 0 &&
						users.map((user) => (
							<div
								key={user.id}
								className="flex gap-6 shadow p-4 rounded-[36px] border hover:shadow-md transition-all"
							>
								<img
									src={user.avatar}
									alt="avatar"
									className="h-32 w-32 rounded-3xl"
								/>
								<div className="flex flex-col gap-2 flex-1 justify-center">
									<p className="font-medium text-lg">{user.email}</p>
									<p className="">{user.username}</p>
								</div>
								<button
									className="text-red-400"
									onClick={() => handleDelete(user.id)}
								>
									Xoá
								</button>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default App;
