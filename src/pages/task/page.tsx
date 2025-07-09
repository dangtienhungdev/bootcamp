import { Button } from '@/components/ui/button';
import FormCreate from './components/form-create';
import type { Task } from '@/types/task.type';
import { useTaskStore } from '@/stores/useTaskStore';

const TaskPage = () => {
	const bodyTaskCreate: Task = {
		id: Math.round(Math.random() * 1000),
		completed: true,
		title: 'ABC',
	};

	const {
		tasks,
		setTasks,
		deleteTask,
		updateTask,
		detailTask,
		task: taskDetail,
	} = useTaskStore();

	const handleCreateTask = () => {
		setTasks(bodyTaskCreate);
	};

	const handleUpdate = (task: Task) => {
		const bodyTaskUpdate = {
			...task,
			title: `${task.title} updated`,
		};
		updateTask(bodyTaskUpdate);
	};

	const handleDetail = (id: number) => {
		detailTask(id);
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
									<Button onClick={() => handleDetail(task.id)}>Detail</Button>
									<Button onClick={() => handleUpdate(task)}>Update</Button>
									<Button onClick={() => deleteTask(task.id)}>Delete</Button>
								</div>
							</div>
						);
					})}
			</div>

			{taskDetail && (
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
			)}
		</div>
	);
};

export default TaskPage;
