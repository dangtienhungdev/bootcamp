export const showTodo = (todoList, taskBox, filterStatus, isEditTask) => {
	const result =
		filterStatus === 'all'
			? todoList
			: todoList.filter((todoItem) => todoItem.status === filterStatus);

	// get
	const htmls = result.map((todo, index) => {
		return /* html */ `
      <li class="task">
        <label for="checked-${todo.id}">
          <input type="checkbox" id="checked-${
						todo.id
					}" class="input-checked" data-id="${todo.id}" ${
			todo.status === 'completed' ? 'checked' : ''
		}>
          <p class="desc ${
						todo.status === 'completed' ? 'line-through' : ''
					}">${todo.name}</p>
        </label>

        <div class="settings">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

          <ul class="task-menu">
            <li class="btn-edit" data-id="${todo.id}" data-name="${todo.name}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <span>Edit</span>
            </li>
            <li class="btn-delete" data-id="${todo.id}">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <span>Delete</span>
            </li>
          </ul>
        </div>
      </li>
    `;
	});

	taskBox.innerHTML =
		htmls.length > 0
			? htmls.join(' ')
			: `<p class="no-data">You don't have any task here</p>`;
	taskBox.offsetHeight >= 300
		? taskBox.classList.add('overflow')
		: taskBox.classList.remove('overflow');

	// handle logic show setting popup
	const btns = document.querySelectorAll('.settings button');
	const taskMenus = document.querySelectorAll('.settings .task-menu');
	btns.forEach((btn, index) => {
		btn.onclick = () => {
			if (taskMenus && taskMenus.length > 0) {
				taskMenus[index].classList.add('show');

				document.addEventListener('click', (event) => {
					if (event.target.parentElement != btn) {
						taskMenus[index].classList.remove('show');
					}
				});
			}
		};
	});

	// handle logic delete
	const btnDeletes = document.querySelectorAll('.task-menu .btn-delete');
	btnDeletes.forEach((btnDelete) => {
		btnDelete.addEventListener('click', () => {
			const id = btnDelete.dataset.id;
			const newTodoList = todoList.filter((todo) => todo.id !== id);
			localStorage.setItem('todo-list', JSON.stringify(newTodoList));
			showTodo(newTodoList, taskBox, filterStatus);
		});
	});

	// handle logic checked input
	const checkboxs = document.querySelectorAll('.input-checked');
	const descs = document.querySelectorAll('.desc');
	checkboxs.forEach((checkboxItem, index) => {
		checkboxItem.addEventListener('click', () => {
			const lastChild = checkboxItem.parentElement.lastElementChild;

			const checked = checkboxItem.checked;
			const id = checkboxItem.dataset.id;
			const todoItem = todoList.find((todo) => todo.id === id);

			if (todoItem) {
				if (checked) {
					todoItem.status = 'completed';
					// descs[index].classList.add('line-through');
					lastChild.classList.add('line-through');
				} else {
					// descs[index].classList.remove('line-through');
					lastChild.classList.remove('line-through');
					todoItem.status = 'pending';
				}
			}

			const result = todoList.map((todo) => {
				if (todo.id === id) {
					return todoItem;
				}
				return todo;
			});

			localStorage.setItem('todo-list', JSON.stringify(result));
		});
	});

	// btn edit
	const btnEdits = document.querySelectorAll('.task-menu .btn-edit');
	btnEdits.forEach((btnEdit) => {
		btnEdit.addEventListener('click', () => {
			const { id, name } = btnEdit.dataset;

			// gán lại giá trị vào input
			const taskInput = document.querySelector('.task-input input');
			taskInput.value = name;
			taskInput.focus();
			isEditTask = true;
		});
	});
};
