
const top10Movies = [];

const getMovie =(movie) => {
    const url =`http://www.omdbapi.com/?t=${movie}&apikey=${OMDbKey}&`
    return fetch(url)
        .then(response => response.json())
        .then(movieData => {
            top10Movies.push(movieData);
        })
        .catch(error => console.log(error));
}





// const {Title, Year, Rated, Released, Runtime, Genre, Director, Actors, Plot, Language, Poster, imdbRating, imdbID} = movieData;