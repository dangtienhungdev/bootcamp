import { lastOriginals } from './data.js';

// dom

const advertisment = document.querySelector('#advertisment');
const lastOriginal = document.querySelector('#lastOriginal .glider');
const entireSeason = document.querySelector('#entrSsn .glider');

window.addEventListener('scroll', () => {
	const scrollY = window.scrollY;

	if (scrollY >= 100) {
		advertisment.className = 'ads show';
	} else {
		advertisment.className = 'ads hide';
	}
});

// slider
lastOriginals.map((element) => {
	const link = document.createElement('a');
	link.setAttribute('href', element.link);

	const div = document.createElement('div');
	div.setAttribute('class', 'card');

	const infoDiv = document.createElement('div');
	infoDiv.setAttribute('class', 'info-card');

	const img = document.createElement('img');
	img.setAttribute('src', element.image);
	img.setAttribute('class', 'card-img');

	const contentDiv = document.createElement('div');
	contentDiv.setAttribute('class', 'contentDiv');

	const genre = document.createElement('p');
	genre.setAttribute('class', 'genre');
	genre.innerText = element.genre;

	const title = document.createElement('p');
	title.setAttribute('class', 'title');
	title.innerText = element.title;

	const desc = document.createElement('p');
	desc.setAttribute('class', 'description');
	desc.innerText = element.desc;

	contentDiv.append(genre, title, desc);
	infoDiv.append(img, contentDiv);
	div.append(infoDiv);
	link.append(div);
	lastOriginal.append(link);
});
new Glider(lastOriginal, {
	slidesToShow: 3,
	draggable: true,
	slidesToScroll: 3,
	arrows: {
		prev: '#lastOriginal .glider-prev',
		next: '#lastOriginal .glider-next',
	},
});

// entireSeason
