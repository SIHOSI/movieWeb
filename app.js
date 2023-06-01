const API_KEY = config.apikey; //config.js에서 apikey 불러오기 // api키를 입력.

const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?';

const API_SEARCH = 'https://api.themoviedb.org/3/search/movie?';

const main = document.getElementById('main');
// console.log(main);
// const main2 = document.querySelector('main');
// console.log(main2); // main과 main2는 동일한 값을 반환

// const main3 = document.querySelectorAll('main');
// console.log(main3); // Nodelist를 반환

const homeButton = document.getElementById('homeButton');

const form = document.getElementById('form');

const search = document.getElementById('search');

const searchIcon = document.querySelector('.fa-magnifying-glass');

const mouse = main.addEventListener('mouseover', (event) => {
    // console.log(event); // mouseevent 객체 반환
    const target = event.target;
    if (target.tagName === 'IMG' || target.className === 'overview') {
        target.style.cursor = 'pointer';
    }
}); // 마우스를 카드 위에 올렸을때 마우스포인터를 바꿔준다

const color = (vote) => {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
}; // 평점에 따라 색상 변경

const imageClick = (movieId) => {
    alert(`영화 ID: ${movieId}`);
}; // 이미지 클릭시 영화아이디 알림 / 이 기능 안쓰면 overview 클릭 이벤트 깔끔해짐

const getMovies = (API) => {
    fetch(API)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.results); //array안에 객체 20개가 들어있다 각 객체는 영화의 정보를 가지고 있음
            showMovies(data.results);
        });
};

const showMovies = (data) => {
    main.innerHTML = ''; // main요소 초기화, html에 적어놓은 샘플 카드 삭제

    data.forEach((item) => {
        // console.log(item); //영화 정보 객체
        const { id, title, poster_path, vote_average, overview } = item;
        const movie = document.createElement('div');
        movie.classList.add('movie'); // 각 영화 정보를 토대로 movie 변수 생성, div요소를 생성하고 classList를 통해 movie 클래스를 추가.
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
                                <h3>${overview}</h3>
                            </div>`; // 영화 카드 내용 구성, 평점은 color함수를 사용하여 적절한 색상 클래스를 동적할당, toFixed(1)사용해서 소수점한자리 까지 표시

        main.appendChild(movie); // 생성된 영화 카드를 main 하위에 추가.
    });

    const movies = document.querySelectorAll('.movie');
    // console.log(movies); // movie명을 가진 모든 div를 Nodelist형태로 movies에 저장.

    movies.forEach((item) => {
        // console.log(item); // div class=movie 안에 있는 모든 요소들. 추가된 20개의 영화들의 html 양식
        item.addEventListener('click', () => {
            item.classList.toggle('active'); // 클릭하면 active클래스를 추가, 이미 존재한다면 제거, overview의 내용을 활성/비활성 상태로 전환.
        });
    });
};

getMovies(API_POPULAR + 'api_key=' + API_KEY + '&language=ko'); // getmovies 실행. // &language=ko 하면 한글로 출력

form.addEventListener('submit', (text) => {
    text.preventDefault();
    // console.log(text); // SubmitEvent 객체 반환 , 주의)input. 하면 안됨
    const searchTerm = search.value; // 입력한 값을 searchTerm 에 저장.

    if (searchTerm) {
        getMovies(
            API_SEARCH +
                'api_key=' +
                API_KEY +
                `&query=${searchTerm}&language=ko`
        );
    } else {
        getMovies(API_POPULAR + 'api_key=' + API_KEY + '&language=ko');
    }
}); // 검색어를 포함한 영화를 가져와서 화면에 표시 / 내용 없이 엔터를 치면 초기 화면으로 돌아감

searchIcon.addEventListener('click', () => {
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(
            API_SEARCH +
                'api_key=' +
                API_KEY +
                `&query=${searchTerm}&language=ko`
        );
    } else {
        getMovies(API_POPULAR + 'api_key=' + API_KEY + '&language=ko');
    }
});

homeButton.addEventListener('click', () => {
    search.value = ''; // 홈버튼 누를 시 검색창 초기화
    getMovies(API_POPULAR + 'api_key=' + API_KEY + '&language=ko');
}); // 홈버튼 누르면 첫번째 페이지로 돌아감.
