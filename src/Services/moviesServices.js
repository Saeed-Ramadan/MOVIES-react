import axios from "axios";

export function getMovies(){
    return axios.get('http://localhost/MoviesApis/api/read.php');
}

export function getMovie(movieId){
    return axios.get(`http://localhost/MoviesApis/api/singleRead.php?id=${movieId}`);
}

export function saveMovie (movie){
    if(movie._id){
        return axios.put(`http://localhost/MoviesApis/api/update.php`,movie);
    }
    return axios.post(`http://localhost/MoviesApis/api/create.php`,movie);
}