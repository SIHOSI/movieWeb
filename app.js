const API_KEY = '?api_key=e2124fff88b3cf85df566d38b1f8ae8f';

const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular';

const API_SEARCH = 'https://api.themoviedb.org/3/search/movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer e2124fff88b3cf85df566d38b1f8ae8f',
    },
};

const color = (vote) => {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
};

const imageClick = (movieId) => {
    alert(`영화 ID: ${movieId}`);
};

const homeButton = document.getElementById('homeButton');

const main = document.getElementById('main');

const mouse = main.addEventListener('mouseover', (event) => {
    const target = event.target;
    if (target.tagName === 'IMG' || target.className === 'overview') {
        target.style.cursor = 'pointer';
    }
});

const form = document.getElementById('form');
const search = document.getElementById('search');

const getMovies = (API, options) => {
    fetch(API, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.results);
            showMovies(data.results);
        });
};

const showMovies = (data) => {
    main.innerHTML = '';

    data.forEach((item) => {
        console.log(item);
        const { id, title, poster_path, vote_average, overview } = item;
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.innerHTML = `<img
                                src="${
                                    'https://image.tmdb.org/t/p/w500' +
                                    poster_path
                                }"
                                alt="${title}"
                                onclick="imageClick(${id})"
                            />

                            <div class="movie_info">
                                <h3>${title}</h3>
                                <span class="${color(
                                    vote_average
                                )}">${vote_average.toFixed(1)}</span>
                            </div>

                            <div class="overview" onclick="imageClick(${id})">
                                <h2>${title}</h2>
                                <h3>${overview}</h3>
                            </div>`;

        main.appendChild(movie);
    });

    mouse;
};

getMovies(
    'https://api.themoviedb.org/3/movie/popular?api_key=e2124fff88b3cf85df566d38b1f8ae8f&language=ko'
);

form.addEventListener('submit', (text) => {
    text.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(
            `https://api.themoviedb.org/3/search/movie?api_key=e2124fff88b3cf85df566d38b1f8ae8f&query=${searchTerm}&language=ko`
        );
    } else {
        getMovies(
            'https://api.themoviedb.org/3/movie/popular?api_key=e2124fff88b3cf85df566d38b1f8ae8f&language=ko'
        );
    }
});

homeButton.addEventListener('click', () => {
    getMovies(
        'https://api.themoviedb.org/3/movie/popular?api_key=e2124fff88b3cf85df566d38b1f8ae8f&language=ko'
    );
});
