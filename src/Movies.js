import React, { Component } from 'react';
import { getMovies } from './Services/moviesServices';
import Like from './components/like';
import ListGroup from './components/listgroup';
import Pagination from './components/pagination';
import { paginate } from './components/paginate';
import { getGenres } from './Services/genresServices';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

class Movies extends Component {
  constructor(props) {
    super(props);
    try {
    const jwt = localStorage.getItem("token");
    const data = jwt_decode(jwt);
    const user = data.data;
    this.state.user = user;
    } catch (ex) { }
    }
    
    state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      user: {}
      }
      
  async componentDidMount() {
    const { data: { body } } = await getGenres();
    const genres = [{ name: 'All Genres' }, ...body];
    const { data: { body: moviesFromServer } } = await getMovies();
    this.setState({ movies: moviesFromServer, genres });
  }

  renderAddNew() {
    const { is_admin } = this.state.user;
    if (is_admin === 'true') {
    return <Link
    to='/movies/new'
    className='btn btn-primary'
    style={{ margin: '10px auto', display: 'block', width: 250 }}
    >New Movie</Link>
    }
    }
    
  delete = async movieID => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== movieID);
    this.setState({ movies });
    try {
      await axios.delete(`http://localhost/MoviesApis/api/delete.php`, {
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          _id: movieID
        }
      });
      toast.info("post deleted successfully");

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this post is already deleted");
      }
      else if (ex.response && ex.response.status === 401) {
        toast.error("you should login to able to delete this movie");
      }
      this.setState({ movies: originalMovies });
    }
  }
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  }
  pageChange = page => {
    this.setState({ currentPage: page })
  }
  genreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }
  render() {
    const { length: count } = this.state.movies;

    if (count === 0)
      return <p className='display-4 text-center'>there's no movies yet</p>

    const { selectedGenre } = this.state;
    const filtered = selectedGenre && selectedGenre._id ?
      this.state.movies.filter(m => m.genre._id === selectedGenre._id) : this.state.movies;

    const movies = paginate(filtered, this.state.currentPage, this.state.pageSize);

    return (
      <main className='container'>
        <p className='text-center'>there's {filtered.length} items</p>
        <div className='row'>
          <div className='col-3 mt-5'>
            <ListGroup
              genres={this.state.genres}
              onGenreSelect={this.genreSelect}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className='col-9'>
          {this.renderAddNew()}
            <Link
              to='/movies/new'
              className='btn btn-primary'
              style={{ margin: "20px auto", display: 'block', width: 250 }}
            > New Movie</Link>
            <table className='table table-hover table-stripped border mt-5'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>genre</th>
                  <th>InStock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie =>
                  <tr key={movie._id}>
                    <td>
                      <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
                    </td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        like={movie.like}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.delete(movie._id)}
                        className='btn btn-danger'>
                        <i className='fa fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              noOfMovies={filtered.length}
              pageSize={this.state.pageSize}
              onPageChange={this.pageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;