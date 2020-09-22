
const top10Movies = [];

const getMovie =(movie) => {
    const url =`http://www.omdbapi.com/?t=${movie}&apikey=${OMDbKey}&`
    return fetch(url)
        .then(response => response.json())
        .then(movieData => {
            return movieData;
        })
        .catch(error => console.log(error));
}

getMovie("avengers").then((data)=>{
    console.log(data)
    let newMovie = {
        title: data.Title,
        year:  data.Year,
        rated: data.Rated,
        released: data.Released,
        runtime: data.Runtime,
        genre: data.Genre,
        plot: data.Plot,
        language: data.Language,
        poster: data.Plot,
        rating: data.Ratings,
        director: data.Director,
        actors: data.Actors,
    }
    addMovie(newMovie);
});


newMovie = () =>{

}
$("#createMovie").submit(function (event){
    event.preventDefault();

    let newMovie = {
        title: $("#title").val(),
        year:  $("#year").val(),
        rated: $("#rated").val(),
        released: $("#released").val(),
        runtime: $("#runtime").val(),
        genre: $("#genre").val(),
        plot: $("#plot").val(),
        language:$("#language").val(),
        poster: $("#poster").val(),
        rating: $("#rating").val(),
        director: $("#director").val(),
        actors: $("#actors").val(),
    }
    addMovie(newMovie);
});

const addMovie = (movie)=>{
    let url = 'https://copper-cypress-bakery.glitch.me/movies';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(url, options)
        .then((response)=> {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then( (data)=> {
            console.log("success");
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}

const createMovieCard = (movie) => {


    $('#database-list').append(`
     <div id="movie.id" class="card" style="width: 18rem;">
      <button class="updatebtn">Update</button>
      <button class="deletebtn">Delete</button>
      <div class="card-header">${movie.title}</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Year: ${movie.year}</li>
        <li class="list-group-item">Rated: ${movie.rated}</li>
        <li class="list-group-item">Released: ${movie.released}</li>
        <li class="list-group-item">Runtime: ${movie.runtime}</li>
        <li class="list-group-item">Genre: ${movie.genre}</li>
        <li class="list-group-item">Director: ${movie.director}</li>
        <li class="list-group-item">Actors: ${movie.actors}</li>
        <li class="list-group-item">Plot: ${movie.plot}</li>
        <li class="list-group-item">Language: ${movie.language}</li>
        <li class="list-group-item">Poster: ${movie.poster}</li>
        <li class="list-group-item">Ratings: ${movie.ratings}</li>
      </ul>
    </div>
    `);
}

const getDatabase =() => {
    let url = 'https://copper-cypress-bakery.glitch.me/movies';
    fetch(url)
        .then((response)=> {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then( (data)=> {
            console.log("success");
            for(let movie of data){
                createMovieCard(movie);
            }
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}
getDatabase();


// const {Title, Year, Rated, Released, Runtime, Genre, Director, Actors, Plot, Language, Poster, imdbRating, imdbID} = movieData;