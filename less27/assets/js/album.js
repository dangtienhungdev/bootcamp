const getAlbums = () => {
	return new Promise((resolve, reject) => {
		fetch(`https://jsonplaceholder.typicode.com/albums`)
			.then((response) => response.json())
			.then((albums) => {
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);
				const userId = urlParams.get('userId');
				const albumOfUserId = albums.filter(
					(albumItem) => albumItem.userId === Number(userId)
				);
				return resolve(albumOfUserId);
			})
			.catch((error) => reject(error));
	});
};

getAlbums().then((albums) => {
	const albumContainer = document.querySelector('.album-container');

	const html = albums.map((albumItem) => {
		return /* html */ `
      <div>
        <a href="">${albumItem.title}</a>
      </div>
    `;
	});

	albumContainer.innerHTML = html.join('');
});
