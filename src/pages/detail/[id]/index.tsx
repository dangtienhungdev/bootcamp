import { getDetailUser } from '@/apis/user.api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
	const params = useParams();
	const id = params.id;

	const result = useQuery({
		queryKey: ['user-detail', id],
		queryFn: () => getDetailUser(id!),
		enabled: Boolean(id),
	});
	const { data: user, isError, isLoading } = result;

	if (isLoading) {
		return <p>Loading.....</p>;
	}

	if (isError) {
		return <div>Error!</div>;
	}

	return (
		<div className="p-10">
			User {user?.name} - Email: {user?.email} - age: {user?.age}
		</div>
	);
};

export default DetailPage;
