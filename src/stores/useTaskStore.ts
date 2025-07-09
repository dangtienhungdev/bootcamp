import type { Task } from '@/types/task.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskState {
	tasks: Task[];
	task: Task | undefined;
	setTasks: (task: Task) => void;
	deleteTask: (id: number) => void;
	updateTask: (task: Task) => void;
	detailTask: (id: number) => void;
}

// const [state, setState] = useState()
// const [tasks, setTasks] = useState
export const useTaskStore = create<TaskState>()(
	persist(
		(set) => ({
			tasks: [],
			task: undefined,

			// actions
			setTasks: (task: Task) =>
				set((state) => {
					return { tasks: [...state.tasks, task] };
				}),

			deleteTask: (id: number) =>
				set((state: TaskState) => {
					const newTask = state.tasks.filter((task) => task.id !== id);
					const taskExits =
						state.task && state.task.id === id ? state.task : undefined;
					if (taskExits) {
						return { tasks: newTask, task: undefined };
					}
					return { tasks: newTask };
				}),

			updateTask: (task: Task) =>
				set((state: TaskState) => {
					const newTasks = state.tasks.map((taskItem) => {
						if (taskItem.id === task.id) {
							return task;
						}
						return taskItem;
					});
					return { tasks: newTasks };
				}),

			detailTask: (id: number) => {
				set((state: TaskState) => {
					const detailTask = state.tasks.find((task) => task.id === id);
					return { task: detailTask };
				});
			},
		}),
		{
			name: 'taskStore',
		}
	)
);
