// import { format } from 'date-fns';

import('https://cdn.skypack.dev/date-fns').then((dateFns) => {
	console.log(dateFns);
	console.log(
		dateFns.formatRelative(
			new Date(2014, 1, 12, 11, 30, 30),
			new Date(2014, 1, 11, 11, 30, 30)
		)
	);
});

const formatDate = (dateString) => {
	const date = new Date(dateString);
	// console.log(date);
	// February 3rd, 2025

	const day = date.getDate();
	let suffix = '';

	switch (day) {
		case 1:
			suffix = 'st';
			break;
		case 2:
			suffix = 'nd';
			break;
		case 3:
			suffix = 'rd';
			break;
		default:
			suffix = 'th';
			break;
	}

	const formatDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric', // hiển thị đẩy đủ 2025
		month: 'long', // january -> jan, february -> feb
	}).format(date);

	// return dateString;
	return `${formatDate.replace(' ', ` ${day + suffix}, `)}`;
};

const getUsers = () => {
	return new Promise((resolve, reject) => {
		fetch('https://67a0c1565bcfff4fabe07e70.mockapi.io/api/v2/users')
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

getUsers()
	.then((data) => {
		const htmls = data.map((user) => {
			return /* html */ `
        <div class="bg-white rounded-md shadow-md p-4">
          <div class="flex items-center gap-4">
            <img class="h-16 w-16 object-cover rounded-full" src="https://picsum.photos/536/${
							354 * Math.round(Math.random() * 2)
						}" alt="">
            <div class="info flex-1">
              <h2 class="text-xl font-semibold text-gray-700">${user.name}</h2>
              <p class="text-sm text-gray-600">ID: ${user.id}</p>
            </div>
          </div>

          <div class="space-y-2 mt-4">
            <p class="text-gray-700">
              <span class="font-medium">Email:</span>
              ${user.email}
            </p>

            <p class="text-gray-700">
              <span class="font-medium">Phone:</span>
              ${user.phone}
            </p>

            <p class="text-gray-700">
              <span class="font-medium">Created:</span>
              ${formatDate(new Date(user.createdAt))}
            </p>
          </div>
        </div>
      `;
		});
		document.querySelector('.user-list').innerHTML = htmls.join('');
	})
	.catch((error) => console.log(error));
