/*
DOM: querySelector, classList.toggle, classList.remove, classList.add
Event: click,
Local: localStorage
*/
/*
crud
1. c - create
2. r - read
3. u - update
4. d - delete
*/

import { showTodo } from './components/show-todo.js';
import { uuid } from './uuid.js';

/*
localStorege
- get: lấy dữ liệu
- set: thêm dữ liệu vào
*/

// create
const taskBox = document.querySelector('.task-box');
const taskInput = document.querySelector('.task-input input');
const filters = document.querySelectorAll('.filters button');

const clearAll = document.querySelector('.clear-btn');
let todos = JSON.parse(localStorage.getItem('todo-list')) ?? [];
let tabActive = 'all';
let isEditTask = false;
console.log('🚀 ~ isEditTask:', isEditTask);

filters.forEach((btn) => {
	btn.addEventListener('click', () => {
		todos = JSON.parse(localStorage.getItem('todo-list')) ?? [];
		// handle ui/ux -> done
		const buttonActive = document.querySelector('.filters button.active');
		buttonActive.classList.remove('active');
		btn.classList.add('active');
		tabActive = btn.id;
		showTodo(todos, taskBox, btn.id);
	});
});

// remove clear all
clearAll.addEventListener('click', () => {
	todos = JSON.parse(localStorage.getItem('todo-list')) ?? [];
	todos.splice(0, todos.length);
	localStorage.setItem('todo-list', JSON.stringify(todos));
	showTodo(todos, taskBox, 'all');
});

// create
taskInput.addEventListener('keyup', (event) => {
	const task = taskInput.value;

	if (event.key === 'Enter') {
		if (isEditTask) {
			// handle logic edit
		} else {
			const newTask = {
				id: uuid(),
				name: task,
				status: 'pending',
			};
			todos.push(newTask);
			taskInput.value = '';
			localStorage.setItem('todo-list', JSON.stringify(todos));
			todos = JSON.parse(localStorage.getItem('todo-list')) ?? [];
		}

		showTodo(todos, taskBox, tabActive, isEditTask);
	}
});

showTodo(todos, taskBox, tabActive, isEditTask);
