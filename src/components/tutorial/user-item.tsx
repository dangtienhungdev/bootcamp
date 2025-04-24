import { User } from '../../types/user.type';

interface UserItemProps {
	user: User;
}

const UserItem = ({ user }: UserItemProps) => {
	return (
		<div
			key={user.id}
			className="flex gap-6 shadow p-4 rounded-lg border hover:shadow-md transition-all"
		>
			<div className="flex flex-col gap-2 flex-1 justify-center">
				<p className="font-medium text-lg">{user.name}</p>
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
};

export default UserItem;
