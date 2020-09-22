
const top10Movies = [];

const getMovie =(movie) => {
    const url =`http://www.omdbapi.com/?t=${movie}&apikey=${OMDbkey}&`
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
        rating: data.Rating,
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
            console.log("success",data);
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}



// const {Title, Year, Rated, Released, Runtime, Genre, Director, Actors, Plot, Language, Poster, imdbRating, imdbID} = movieData;