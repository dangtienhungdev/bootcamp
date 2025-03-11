import { URL } from './services.js';

const resultWrapper = document.querySelector('#result-wrapper');
const nextBtn = document.querySelector('.content__result__next-btn');
const pageNumber = document.querySelector('.page-number');
const searchInput = document.querySelector('#main-header--search');
const searchTrend = document.querySelector('.search-trend');
const contentResultWrapper = document.querySelector('.content_result-wrapper');
const movieDetailWrapper = document.querySelector('#id-details-wrapper');
const btnCloseMovieDetail = document.querySelector('.movie-details__close');

let CURRENT_PAGE = 1;
let SEARCH_DEBOUNCE = null;

const getMovies = async (page = CURRENT_PAGE, search = 'Love') => {
	document.body.classList.add('loading');
	try {
		const response = await axios.get(`${URL}&s=${search}&page=${page}`);
		return response.data.Search;
	} catch (error) {
		console.log(error);
	} finally {
		document.body.classList.remove('loading');
	}
	// const response = await axios
	// 	.get(`${URL}&s=Love&page=1`)
	// 	.then((data) => data)
	// 	.catch((error) => error);
	// return response;
};

// fetch(`${URL}&s=Love&page=1`)
// 	.then((response) => response.json())
// 	.then((data) => data)
// 	.catch((error) => {
// 		console.log(error);
// 	});

const getMovieDetail = async (idMovie) => {
	try {
		const response = await axios.get(`${URL}&i=${idMovie}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const generateMovieItem = (movies) => {
	const htmls = movies.map((movie) => {
		return /* html */ `
    <div class="movie-item" data-id="${movie.imdbID}">
      <figure class="movie-item__poster"
        style="background-image: url('${movie.Poster}');">
      </figure>
      <h2 class="movie-item__title">${movie.Title}</h2>
      <div class="movie-item__meta">
        <span class="movie-item__meta__year">${movie.Year}</span>
        <span class="movie-item__meta__divider">&nbsp;-&nbsp;</span>
        <span class="movie-item__meta__imdb-link">
          <a href="#" class="">IMDB</a>
        </span>
      </div>
    </div>
  `;
	});

	resultWrapper.innerHTML = htmls.join(' ');
};

// initial render
const movies = await getMovies();
generateMovieItem(movies);
pageNumber.innerText = `Page ${CURRENT_PAGE}`;

// handle click btn next page
nextBtn.addEventListener('click', async () => {
	// logic
	CURRENT_PAGE++;

	const movies = await getMovies(CURRENT_PAGE);

	// render item
	generateMovieItem(movies);
	pageNumber.innerText = `Page ${CURRENT_PAGE}`;
});

searchInput.addEventListener('input', async (e) => {
	if (SEARCH_DEBOUNCE) {
		clearTimeout(SEARCH_DEBOUNCE);
	}

	SEARCH_DEBOUNCE = setTimeout(async () => {
		let valueInput = e.target.value;
		CURRENT_PAGE = 1;

		if (!valueInput) {
			valueInput = 'Love';
		}

		if (valueInput.length < 4) {
			return;
		}

		searchTrend.innerText = valueInput;

		const movies = await getMovies(CURRENT_PAGE, valueInput);

		// render item
		generateMovieItem(movies);
		pageNumber.innerText = `Page ${CURRENT_PAGE}`;
	}, 500);
});

const movieItems = document.querySelectorAll('.movie-item');
movieItems.forEach((movieItem) => {
	movieItem.addEventListener('click', async () => {
		const id = movieItem.dataset.id;

		const movieDetail = await getMovieDetail(id);
		console.log(movieDetail.Poster);

		if (movieDetail) {
			document.querySelector('.movie-details__title h2').innerText =
				movieDetail.Title;
			document.querySelector(
				'.movie-details__rating'
			).innerText = `${movieDetail.imdbRating}/10`;

			document.querySelector(
				'.movie-details__poster'
			).style.backgroundImage = `url("${movieDetail.Poster}")`;

			document.querySelector('.movie-details__meta .released').innerText =
				movieDetail.Released;
			document.querySelector('.movie-details__meta .runtime').innerText =
				movieDetail.Runtime;

			document.querySelector('.movie-details__meta .genre').innerText =
				movieDetail.Genre;
			document.querySelector('.movie-details__meta .director').innerText =
				movieDetail.Director;
			document.querySelector('.movie-details__meta .country').innerText =
				movieDetail.Country;
			document.querySelector('.movie-details__meta .language').innerText =
				movieDetail.Language;
			document.querySelector('.movie-details__meta .actors').innerText =
				movieDetail.Actors;
			document.querySelector('.movie-details__meta .description').innerText =
				movieDetail.Plot;

			contentResultWrapper.classList.add('--visible');
		}
	});
});

btnCloseMovieDetail.addEventListener('click', () => {
	contentResultWrapper.classList.remove('--visible');
});
