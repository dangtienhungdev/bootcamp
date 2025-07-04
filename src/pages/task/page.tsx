import { Button } from '@/components/ui/button';
import { useTaskStore } from '@/stores/useTaskStore';
import type { Task } from '@/types/task.type';

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
	console.log('🚀 ~ TaskPage ~ taskDetail:', taskDetail);
	console.log('🚀 ~ TaskPage ~ tasks:', tasks);

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
			<Button onClick={() => handleCreateTask()}>Thêm mới task</Button>

			<div>
				{tasks &&
					tasks.length > 0 &&
					tasks.map((task, index) => {
						return (
							<div key={index}>
								{task.title}-{' '}
								{task.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
								<Button onClick={() => handleDetail(task.id)}>Detail</Button>
								<Button onClick={() => handleUpdate(task)}>Update</Button>
								<Button onClick={() => deleteTask(task.id)}>Delete</Button>
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
