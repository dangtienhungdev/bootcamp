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
		console.log('🚀 ~ movieItem.addEventListener ~ movieDetail:', movieDetail);
		console.log(movieDetail.Poster);

		if (movieDetail) {
			const html = /* html */ `
      <div>
      <span class="movie-details__close">
        x
      </span>
      <figure class="movie-details__poster"
        style="background-image: url('${movieItem.Poster}');">
      </figure>
      <div class="movie-details__content">
        <div class="movie-details__title">
          <h2>abcabc</h2>
          <span class="movie-details__rating">6.6/10</span>
        </div>
        <div class="movie-details__meta">
          <span>
            <span class="--label">Released:</span>
            07 Apr 2007
          </span>
          &nbsp;-&nbsp;
          <span>
            <span class="--label">Runtime:</span>
            07 Apr 2007
          </span>
        </div>
        <div class="movie-details__meta">
          <span>
            <span class="--label">Genre:</span>
            Animation, Comedy, Romance
          </span>
        </div>
        <div class="movie-details__meta">
          <span>
            <span class="--label">Director:</span>
            N/A - Writer:Aya Nakahara
          </span>
        </div>
        <div class="movie-details__meta">
          <span>
            <span class="--label">Country:</span>
            Japan
          </span>
          &nbsp;-&nbsp;
          <span>
            <span class="--label">Language:</span>
            English, Japanese
        </div>
        <div class="movie-details__meta">
          <span>
            <span class="--label">Actors:</span>
            Amber Lee Connors, Howard Wang, Gianni Matragrano
          </span>
        </div>
        <div class="movie-details__meta">
          <span>
            <span class="--label">Summary:</span>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
              ut
              laoreet dolore
              magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl
              ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit
              praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
          </span>
        </div>
      </div>
      </div>
    `;

			movieDetailWrapper.innerHTML = html;
			contentResultWrapper.classList.add('--visible');
		}
	});
});

btnCloseMovieDetail.addEventListener('click', () => {
	contentResultWrapper.classList.remove('--visible');
});
