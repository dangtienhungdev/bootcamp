import { entireSeasons, lastOriginals } from './data.js';

// dom

const advertisment = document.querySelector('#advertisment');
const lastOriginal = document.querySelector('#lastOriginal .glider');
const entireSeasonElement = document.querySelector('#entrSsn .glider');
const playbackElement = document.querySelector('#playback .glider');
const commingSoonElement = document.querySelector('#comming-soon .glider');

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
	responsive: [
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 0,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 760,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			// manf hình lớn hơn 1280px nó sẽ ăn
			breakpoint: 1280,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
	],
});

// entireSeason
entireSeasons.map((element) => {
	const link = document.createElement('a');
	link.setAttribute('class', 'innerLinks');
	link.setAttribute('href', element.link);

	const div = document.createElement('div');
	div.setAttribute('class', 'card');

	const img = document.createElement('img');
	img.setAttribute('src', element.image);
	// img.setAttribute('class')

	div.append(img);
	link.append(div);
	entireSeasonElement.append(link);
});
new Glider(entireSeasonElement, {
	slidesToShow: 5,
	draggable: true,
	slidesToScroll: 5,
	arrows: {
		prev: '#entrSsn .glider-prev',
		next: '#entrSsn .glider-next',
	},
	responsive: [
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 0,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			// manf hình lớn hơn 480 nó sẽ ăn
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 760,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			// manf hình lớn hơn 1280px nó sẽ ăn
			breakpoint: 1280,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			},
		},
	],
});

// playback
entireSeasons.map((element) => {
	const link = document.createElement('a');
	link.setAttribute('class', 'innerLinks');
	link.setAttribute('href', element.link);

	const div = document.createElement('div');
	div.setAttribute('class', 'card');

	const img = document.createElement('img');
	img.setAttribute('src', element.image);
	// img.setAttribute('class')

	div.append(img);
	link.append(div);
	playbackElement.append(link);
});
new Glider(playbackElement, {
	slidesToShow: 5,
	draggable: true,
	slidesToScroll: 5,
	arrows: {
		prev: '#entrSsn .glider-prev',
		next: '#entrSsn .glider-next',
	},
	responsive: [
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 0,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			// manf hình lớn hơn 480 nó sẽ ăn
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 760,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			// manf hình lớn hơn 1280px nó sẽ ăn
			breakpoint: 1280,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			},
		},
	],
});

// playback
entireSeasons.map((element) => {
	const link = document.createElement('a');
	link.setAttribute('class', 'innerLinks');
	link.setAttribute('href', element.link);

	const div = document.createElement('div');
	div.setAttribute('class', 'card');

	const img = document.createElement('img');
	img.setAttribute('src', element.image);
	// img.setAttribute('class')

	div.append(img);
	link.append(div);
	commingSoonElement.append(link);
});
new Glider(commingSoonElement, {
	slidesToShow: 5,
	draggable: true,
	slidesToScroll: 5,
	arrows: {
		prev: '#entrSsn .glider-prev',
		next: '#entrSsn .glider-next',
	},
	responsive: [
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 0,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			// manf hình lớn hơn 480 nó sẽ ăn
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			// manf hình lớn hơn 760px nó sẽ ăn
			breakpoint: 760,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			// manf hình lớn hơn 1280px nó sẽ ăn
			breakpoint: 1280,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 5,
			},
		},
	],
});
