import axios from "axios";

export function getGenres() {
    return axios.get('http://localhost/MoviesApis/api/readG.php');
}