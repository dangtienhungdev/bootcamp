import { instance } from '@/configs/instances';

export const studentApi = {
	// lấy ra tất cả người dùng
	getAll: () => {
		return instance.get('/students');
	},

	// create student
	create: (payload: { email: string; name: string }) => {
		return instance.post('/students', payload);
	},

	// delete
	delete: (id: string) => {
		return instance.delete(`/students/${id}`);
	},
};
