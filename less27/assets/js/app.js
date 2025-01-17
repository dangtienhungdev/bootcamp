// fetch
function getTodos() {
	return new Promise((resolve, reject) => {
		fetch(`https://jsonplaceholder.typicode.com/users`)
			.then(function (response) {
				return response.json();
			})
			.then((users) => {
				resolve(users);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

getTodos().then((users) => {
	const userList = document.querySelector('.user-list');
	const html = users.map((user) => {
		console.log(user);
		return /* html */ `
            <div class="space-y-4">
              <img src="https://picsum.photos/536/354" alt="" class="rounded-2xl">

              <div>
                <a href="./album.html?userId=${user.id}">
                  <p class="font-semibold text-base">${user.name}</p>
                </a>
                <p class="text-xs text-slate-400">${user.website}</p>
              </div>
            </div>
          `;
	});

	userList.innerHTML = html.join('');
});
