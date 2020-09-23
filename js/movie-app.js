const baseurl = 'https://copper-cypress-bakery.glitch.me/movies';

/** DATABASE SEED-EMPTY FUNCTIONS **/
// SEED DATA TO GET FROM OMDB FOR DATABASE
const seedList = [
    "CITIZEN KANE ",
    "CASABLANCA",
    "THE GODFATHER",
    "GONE WITH THE WIND",
    "WIZARD OF OZ",
    "THE GRADUATE",
    "PSYCHO",
    "nightmare on elm street",
    "jason",
    "kill bill",
    "king kong",
    "taxi driver",
    "the conjuring",
    "due date",
    "the hangover",
    "jaws",
    "clockwork orange",
    "hot tub time machine",
    "back to the future",
    "the sandlot",
    "pulp fiction",
    "forrest gump",
    "amercian pie",
    "fight club",
    "donnie darko",
    "mr. deeds",
    "hot chick",
    "ip man",
    "the girl next door",
    "goodfellas",
    "rocky",
    "fanasia",
    "network",
    "apocalypse now"
];

// MAKE REQUEST FROM OMDB API
const getOmdb =(movie) => {
    const url =`http://www.omdbapi.com/?t=${movie}&apikey=${OMDbkey}&`
    return fetch(url)
        .then(response => response.json())
        .then(movieData => {
            return movieData;
        })
        .catch(error => console.log(error));
}

// SEED DATA WHEN NEEDED
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
            createMovie(newMovie);
        });
    } 
}

// DELETES ALL THE MOVIES FROM OUR DATABASE
const deleteAll = () =>{
    fetch(baseurl)
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
/** END DATABASE SEED-EMPTY COMMANDS **/

/** GET MOVIES FROM DATABASE REQUESTS**/
// SERVER REQUEST TO GET ALL MOVIES FROM DATABASE
const getDatabase =() => {
    $("#database-list").html(loader);
    fetch(baseurl)
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

// SERVER REQUEST TO GET SPECIFIC MOVIE FROM DATABASE
const getMovie = (id) => {
    return fetch(baseurl)
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
/** END GET MOVIES REQUEST **/

/** HELPER FUNCTIONS **/
// DYNAMIC MOVIE CARD CREATED FROM MOVIE DATA
const MovieCard = (movie) => {
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

const createMovieCard = (movie) =>{
    $('#database-list').append(`
        <div id="${movie.id}" class="card" style="width: 18rem;">
            <div class="card-header">${movie.title}</div>
            <div class="card-body">
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
            <div class="card-footer">
                <button class="badge badge-pill badge-dark editbtn">Edit</button>
                <button class="badge badge-pill badge-dark deletebtn">Delete</button>
            </div>
        </div>
    `);
}
// CREATES A MOVIE OBJECT BASED ON FORM INPUTS
const setMovieObj = ()=>{
    return {
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
        actors: $("#actors").val()
    }
}

// LOADING SCREEN SPINNER
const loader = `
    <div class="loader">
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
`
/** END HELPER FUNCTIONS**/

/** CRUD - CREATE, READ, UPDATE, DELETE **/
// CRUD CREATE A MOVIE ON DATABASE
const createMovie = (movie)=>{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(baseurl, options)
        .then((response)=> {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then( ()=> {
            console.log("success");
            getDatabase();
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}

// CRUD DELETE MOVIE FROM DATABASE
const deleteMovie = (id)=>{
    let url = `${baseurl}/${id}`;
    fetch(url,{method: "DELETE"}).then(()=> getDatabase());
}

// CRUD UPDATE MOVIE ON DATABASE
const updateMovie =(id) => {
    const url = `${baseurl}/${id}`;
    const movie = setMovieObj()
    const options = {
        method: 'PUT',
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
            $("#formModal").modal("toggle");
            getDatabase();
        })
        .catch( (error) =>{
            console.warn("error", error);
        });
}
/** END CRUD **/


/** FORM SPECIFIC VARS AND FUNCTIONS **/
// FORM: RENDER THE MOVIE FORM FROM CALLBACK
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

// FORM: CREATES THE SELECT VALUES FOR YEARS
const yearsSelect = ()=>{
    let current = (new Date()).getFullYear();
    for (current; current>= 1900; current-- ){
        $("#year").append(`<option value="${current}">${current}</option>`)
    }
}

// FORM: CREATES THE SELECT VALUES FOR GENRE
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

// FORM: CREATES THE SELECT VALUES FOR LANGUAGES
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
// FORM: SHOW CURRENT VALUE OF RATING SLIDER
$(document).on("change","#rating",function () {
    $("#currentRating").html($("#rating").val());
})

// FORM: SET THE INPUT SELECT VALUES FOR THE FORM
const setSelectValues = ()=>{
    loadCreateForm().then( html=>{
        $("#modalForm").html(html);
        yearsSelect();
        genreSelect();
        languageSelect();
    })
}
// FORM: UPDATES THE EDIT FORM VALUES TO THOSE OF THE CURRENT MOVIE
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
/** END FORM **/


/** ONCLICK EVENTS **/
// NEW MOVIE BUTTON ON CLICK DISPLAY THE CREATE MOVIE FORM MODAL
$("#addMovieBtn").click(function (){
    setSelectValues();
    $("#formModal").modal("toggle");
})

// DELETE MOVIE BUTTON ON CLICK DISPLAY CONFIRM DELETE
$(document).on('click','.deletebtn',function(){
    const id = $(this).parent()[0].id;
    const deleteTitle = $(this).siblings("div").html();
    $("#deleteMovieModalLabel").html( deleteTitle);
    $("#deleteMovieModal").modal("toggle");
    // IF USER CLICKS CONFIRM DELETE, DELETE MOVIE
    $(".confirm-delete").click(function () {
        deleteMovie(id);
        $("#deleteMovieModal").modal("toggle");
    })
});

// EDIT MOVIE BUTTON ON CLICK DISPLAY THE UPDATE MOVIE FORM
$(document).on('click','.editbtn',function() {
    const id = $(this).parent().parent()[0].id;
    setSelectValues();
    getMovie(id).then(movie => {
        updateFormValues(movie);
        $('#createMovie').attr("id","updateMovie");
        $('#formModalLongTitle').html("Update Movie");
    });
    $("#formModal").modal("toggle");
});
/** END ONCLICK **/


/** ONSUBMIT EVENTS **/
// CREATE MOVIE FORM ON SUBMIT
$(document).on("submit","#createMovie",function (event){
    event.preventDefault();
    const movie = setMovieObj();
    createMovie(movie);
    $("#formModal").modal("toggle");
});

// EDIT MOVIE FORM ON SUBIT
$(document).on("submit","#updateMovie",function (event){
    event.preventDefault();
    const id = $('input[name="currId"]').val();
    updateMovie(id);
});
/** END ONSUBMIT **/

getDatabase();