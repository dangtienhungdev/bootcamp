const addUserBtn = document.querySelector('#addUserBtn');
const modalAddUser = document.querySelector('#userModal');
const cancelBtn = document.querySelector('#cancelBtn');

const openModal = () => {
	modalAddUser.classList.remove('hidden');
};

const closeModal = () => {
	modalAddUser.classList.add('hidden');
};

cancelBtn.onclick = () => closeModal();

// create user
const saveBtn = document.querySelector('#save-btn');

const handleSaveBtn = (type, id) => {
	saveBtn.addEventListener('click', async (e) => {
		e.preventDefault();

		const inputName = document.querySelector('#name').value;
		const inputEmail = document.querySelector('#email').value;
		const inputPhone = document.querySelector('#phone').value;
		const inputRole = document.querySelector('#role').value;
		const inputStatus = document.querySelector('#status').value;

		const newUser = {
			fullname: inputName,
			email: inputEmail,
			phone: inputPhone,
			role: inputRole,
			avatar:
				'https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg',
			isActive: inputStatus === 'true' ? true : false,
			address: {
				city: 'Ha Noi',
				country: 'Viet Nam',
			},
		};
		console.log('🚀 ~ saveBtn.addEventListener ~ newUser:', newUser);

		if (type === 'add') {
			try {
				const response = await axios.post(
					'http://localhost:8000/users',
					newUser
				);
				console.log('🚀 ~ saveBtn.addEventListener ~ response:', response);
			} catch (error) {
				console.log('🚀 ~ saveBtn.addEventListener ~ error:', error);
			}
		}

		if (type === 'edit') {
			try {
				await axios.put(`http://localhost:8000/users/${id}`, newUser);
			} catch (error) {
				console.log(error);
			}
		}
	});
};

addUserBtn.addEventListener('click', () => {
	openModal();
	handleSaveBtn('add');
});

// async/await
const getAllUser = async () => {
	try {
		const response = await axios.get('http://localhost:8000/users');
		const data = response.data;
		const htmls = data.map((user) => {
			return /* html */ `
        <tr>
          <td class="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
            <img src="${
							user.avatar
						}" class="h-16 w-16 object-cover rounded-md" alt="" />
            <div>
              <p class="font-medium">${user.fullname}</p>
              <p class="font-nomal text-xs text-gray-400">${user.phone}</p>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="rounded-md text-center uppercase text-xs py-2 ${
							user.role === 'admin'
								? 'bg-green-200 text-green-500'
								: 'bg-red-200 text-red-400'
						}">${user.role}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 rounded-full text-xs">
              ${user.isActive ? 'Active' : 'Blocked'}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="edit-btn text-blue-600 hover:text-blue-900 mr-3" data-id="${
							user.id
						}">Edit</button>
            <button type="button" class="cursor-poiter delete-btn text-red-600 hover:text-red-900" data-id="${
							user.id
						}">Delete</button>
          </td>
        </tr>
      `;
		});

		document.querySelector('#userTableBody').innerHTML = htmls.join('');

		handleDeleteUser();
		getUserDetail();
	} catch (error) {
		console.log(error);
	}
};

getAllUser();

const handleDeleteUser = () => {
	const deleteBtns = document.querySelectorAll('.delete-btn');

	deleteBtns.forEach((btn) => {
		btn.onclick = async () => {
			try {
				const id = btn.dataset.id;
				await axios.delete(`http://localhost:8000/users/${id}`);
			} catch (error) {
				console.log(error);
			}
		};
	});
};

const getUserDetail = () => {
	const editBtns = document.querySelectorAll('.edit-btn');
	editBtns.forEach((btn) => {
		btn.onclick = async () => {
			openModal();

			const id = btn.dataset.id;

			try {
				const res = await axios.get(`http://localhost:8000/users/${id}`);
				const data = res.data;

				const valueInputName = document.querySelector('#name');
				valueInputName.value = data.fullname;

				const valueInputEmail = document.querySelector('#email');
				valueInputEmail.value = data.email;

				const valueInputPhone = document.querySelector('#phone');
				valueInputPhone.value = data.phone;

				const valueInputSelectRole = document.querySelector('#role');
				valueInputSelectRole.value = data.role;

				const valueInputSelectActive = document.querySelector('#status');
				valueInputSelectActive.value =
					data.isActive === true ? 'true' : 'false';

				handleSaveBtn('edit', id);
			} catch (error) {
				console.log(error);
			}
		};
	});
};
