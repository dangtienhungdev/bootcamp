import type { Task } from '@/types/task.type';
import { createSlice } from '@reduxjs/toolkit';

interface TodoState {
	tasks: Task[];
	task: Task | null;
}

const initialState: TodoState = {
	tasks: [],
	task: null,
};

export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		// create
		createTask: (state, action) => {
			console.log('🚀 ~ action:', action);
			state.tasks.push(action.payload);
		},

		// delete
		deleteTask: (state, action) => {
			console.log('🚀 ~ action:', action);
			const id = action.payload;
			const newTasks = state.tasks.filter((task) => task.id !== id);
			state.tasks = newTasks;
		},

		// update
		updateTask: (state, action) => {
			console.log('🚀 ~ action:', action);
			const body = action.payload;
			const id = body.id;

			const newTasks = state.tasks.map((task) => {
				if (task.id === id) {
					return body;
				}
				return task;
			});

			state.tasks = newTasks;
		},
	},
});

export const { createTask, deleteTask, updateTask } = todoSlice.actions;

export default todoSlice.reducer;
