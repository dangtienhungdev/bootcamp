import { deleteTask, updateTask } from '@/stores/features/todo/todoSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

import { Button } from '@/components/ui/button';
import FormCreate from './components/form-create';
import type { Task } from '@/types/task.type';

const TaskPageV2 = () => {
	const dispatch = useAppDispatch();
	const { tasks } = useAppSelector((state) => state.todos);
	console.log('🚀 ~ TaskPageV2 ~ tasks:', tasks);

	const handleDelete = (id: number) => {
		dispatch(deleteTask(id));
	};

	const handleUpdate = (task: Task) => {
		const bodyUpdate = {
			...task,
			title: `Update ${task.title}`,
			completed: !task.completed,
		};
		dispatch(updateTask(bodyUpdate));
	};

	return (
		<div className="p-10">
			<FormCreate />

			<div>
				{tasks &&
					tasks.length > 0 &&
					tasks.map((task, index) => {
						return (
							<div
								key={index}
								className="flex items-center justify-between gap-2 border-b border-gray-200 py-2"
							>
								{task.title}-{' '}
								{task.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
								<div>
									<Button>Detail</Button>
									<Button onClick={() => handleUpdate(task)}>Update</Button>
									<Button onClick={() => handleDelete(task.id)}>Delete</Button>
								</div>
							</div>
						);
					})}
			</div>

			{/* {taskDetail && (
				<div>
					<h1>Task chi tiết</h1>
					<div>
						{taskDetail.title}-{' '}
						{taskDetail.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
						<Button onClick={() => handleDetail(taskDetail.id)}>Detail</Button>
						<Button onClick={() => handleUpdate(taskDetail)}>Update</Button>
						<Button onClick={() => deleteTask(taskDetail.id)}>Delete</Button>
					</div>
				</div>
			)} */}
		</div>
	);
};

export default TaskPageV2;
