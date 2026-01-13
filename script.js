const numberOfFilms = +prompt("qancha film ko'rgansiz", '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
}
const   a = prompt("oxirgi ko'rgan filmizgiz nomi?", ''),
        b = +prompt("filmni baholang", ''),
        c = prompt("oxirgi ko'rgan filmizgiz nomi?", ''),
        d = +prompt("filmni baholang", '');
personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;
console.log(personalMovieDB);