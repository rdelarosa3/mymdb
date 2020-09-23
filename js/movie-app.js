
const seedList = [
    "avengers",
    "the pest",
    "nightmare before christmas",
    "space jam",
    "the lord of the rings",
    "star wars",
    "jingle all the way",
    "extraction",
    "iron man",
    "tenet"
];

const getOmdb =(movie) => {
    const url =`http://www.omdbapi.com/?t=${movie}&apikey=${OMDbkey}&`
    return fetch(url)
        .then(response => response.json())
        .then(movieData => {
            return movieData;
        })
        .catch(error => console.log(error));
}

const seedData = ()=>{
    for(let movie of seedList){
        getOmdb(movie).then((data)=>{
            console.log("ombd",data)
            let newMovie = {
                title: data.Title,
                year:  data.Year,
                rated: data.Rated,
                released: data.Released,
                runtime: parseInt(data.Runtime),
                genre: data.Genre.split(", "),
                plot: data.Plot,
                language: data.Language.split(", "),
                poster: data.Poster,
                rating: parseFloat(data.Ratings[0].Value.split("/")[0]),
                director: data.Director,
                actors: data.Actors,
            }
            addMovie(newMovie);
        });
    } 
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
            getDatabase();
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}



const createMovieCard = (movie) => {
    $('#database-list').append(`
        <div id="${movie.id}" class="card" style="width: 18rem;">
            <button class="editbtn">Edit</button>
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
                <li class="list-group-item">Ratings: ${movie.rating}</li>
              </ul>
        </div>
    `);
}

const loader = `<div class="loader">
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
               </div>`

const getDatabase =() => {
    let url = 'https://copper-cypress-bakery.glitch.me/movies';
    $("#database-list").html(loader);
    fetch(url)
        .then((response)=> {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then( (data)=> {
            console.log("success");
            $("#database-list").html("")
            for(let movie of data){
                createMovieCard(movie);
            }
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}
getDatabase();

const getMovie = (id) => {
    let url = 'https://copper-cypress-bakery.glitch.me/movies';
    return fetch(url)
        .then((response)=> {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then( (data)=> {
            for (let movie of data) {
                if (movie.id == id) {
                    console.log(movie);
                    return movie;
                }
            }
            console.log("success");
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}


const deleteMovie = (id)=>{
    let url = `https://copper-cypress-bakery.glitch.me/movies/${id}`;
    fetch(url,{
        method: "DELETE"
    })
        .then(()=> getDatabase());

}

const updateMovie =(id) => {
    let url = `https://copper-cypress-bakery.glitch.me/movies/${id}`;
    let currentMovie = {
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
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentMovie),
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
            $("#formModal").modal("toggle");
            getDatabase();
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}

const deleteAll = () =>{
    fetch('https://copper-cypress-bakery.glitch.me/movies')
        .then((response)=> {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then( (data)=> {
            console.log("deleting data",data);
            for (let movie of data){
                deleteMovie(movie.id);
            }
            getDatabase();
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}

// form creation
const loadCreateForm = ()=>{
    return fetch("_form.html")
        .then((response)=> {
            if (response.ok) {
                return response.text();
            }
            return Promise.reject(response);
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}


const yearsSelect = ()=>{
    let current = (new Date()).getFullYear();
    for (current; current>= 1900; current-- ){
        $("#year").append(`<option value="${current}">${current}</option>`)
    }
}

const genreSelect = ()=>{
    const genres = [
        "Action",
        "Adventure",
        "Comedy",
        "Crime",
        "Drama",
        "Family",
        "Fantasy",
        "Historical",
        "Historical fiction",
        "Horror",
        "Magical realism",
        "Mystery",
        "Paranoid fiction",
        "Philosophical",
        "Political",
        "Romance",
        "Saga",
        "Satire",
        "Science fiction",
        "Social",
        "Speculative",
        "Thriller",
        "Urban",
        "Western",
        "Animation",
        "Video game",
        "Music"
    ];
    for(let genre of genres) {
        $("#genre").append(`<option value="${genre}">${genre}</option>`)
    }
}

const languageSelect = ()=>{
    const langs = [
        "English",
        "Spanish",
        "Mandarin",
        "Arabic",
        "Hindi",
        "Russian",
        "Japanese",
        "Bengali",
        "Indonesian"
    ]
    for(let lang of langs){
        $("#language").append(`<option value="${lang}">${lang}</option>`)
    }
}

const setSelectValues = ()=>{
    loadCreateForm().then( html=>{
        $("#modalForm").html(html);
        yearsSelect();
        genreSelect();
        languageSelect();
    })
}

$("#addMovieBtn").click(function (){
    setSelectValues();
    $("#formModal").modal("toggle");
})

$(document).on('click','.deletebtn',function(){
    const id = $(this).parent()[0].id;
    const deleteTitle = $(this).siblings("div").html();
    $("#deleteMovieModalLabel").html( deleteTitle);
    $("#deleteMovieModal").modal("toggle");
    $(".confirm-delete").click(function () {
        deleteMovie(id);
        $("#deleteMovieModal").modal("toggle");
    })
});

$(document).on("change","#rating",function () {
     $("#currentRating").html($("#rating").val());
})


$(document).on('click','.editbtn',function() {
    let id = $(this).parent()[0].id;
    setSelectValues();
    getMovie(id).then(movie => {
        updateFormValues(movie);
        $('#createMovie').attr("id","updateMovie");
        $('#formModalLongTitle').html("Update Movie");
    });
    $("#formModal").modal("toggle");
});

const updateFormValues =(movie) => {
        $('input[name="currId"]').attr('value',movie.id);
        $("#title").val(movie.title)
        $("#year").val(movie.year)
        $("#rated").val(movie.rated)
        $("#released").val(movie.released)
        $("#runtime").val(movie.runtime)
        $("#genre").val(movie.genre)
        $("#plot").val(movie.plot)
        $("#language").val(movie.language)
        $("#poster").val(movie.poster)
        $("#rating").val(movie.rating)
        $("#director").val(movie.director)
        $("#actors").val(movie.actors)
}

$(document).on("submit","#updateMovie",function (event){
    event.preventDefault();
    let id = $('input[name="currId"]').val();
    updateMovie(id);
});
