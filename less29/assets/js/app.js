fetch('http://localhost:3000/users')
	.then((response) => response.json())
	.then((data) => {
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
            <button class="delete-btn text-red-600 hover:text-red-900" data-id="${
							user.id
						}">Delete</button>
          </td>
        </tr>
      `;
		});

		document.querySelector('#userTableBody').innerHTML = htmls.join('');
	});

// open modal
const addUserBtn = document.querySelector('#addUserBtn');
const modalAddUser = document.querySelector('#userModal');
const closeModalUser = document.querySelector('#cancelBtn');

addUserBtn.addEventListener('click', () => {
	modalAddUser.classList.remove('hidden');
});

closeModalUser.addEventListener('click', () =>
	modalAddUser.classList.add('hidden')
);

// add user
const saveBtn = document.querySelector('#save-btn');

saveBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const valueInputName = document.querySelector('#name').value;
	const valueInputEmail = document.querySelector('#email').value;
	const valueInputPhone = document.querySelector('#phone').value;
	const valueSelectInputRole = document.querySelector('#role').value;
	const valueSelectInputStatus = document.querySelector('#status').value;

	const newUser = {
		fullname: valueInputName,
		email: valueInputEmail,
		phone: valueInputPhone,
		role: valueSelectInputRole,
		avatar:
			'https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg',
		isActive: valueSelectInputStatus === 'true' ? true : false,
		address: {
			city: 'Ha Noi',
			country: 'Viet Nam',
		},
	};

	fetch('http://localhost:3000/users', {
		method: 'POST',
		body: JSON.stringify(newUser),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.log(error));
});

/*
crud
c -> create -> method tương tác api: POST
r -> read -> method tương tác api: GET
u -> update -> method tương tác api: PUT/PATCH
d -> delete -> method tương tác api: DELETE
*/

// search user
const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('input', (e) => {
	const valueInput = e.target.value;
	console.log(valueInput);

	fetch('http://localhost:3000/users')
		.then((response) => response.json())
		.then((data) => {
			const dataFilterNameUser = data.filter(
				(user) => user.fullname.toLowerCase() === valueInput.trim()
			);

			const result = valueInput.trim() === '' ? data : dataFilterNameUser;

			const htmls = result.map((user) => {
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
            <button class="delete-btn text-red-600 hover:text-red-900" data-id="${
							user.id
						}">Delete</button>
          </td>
        </tr>
      `;
			});

			document.querySelector('#userTableBody').innerHTML = htmls.join('');
		});
});
