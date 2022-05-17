import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import { getMovie, saveMovie } from './../Services/moviesServices';
import { getGenres } from '../Services/genresServices';
import { toast } from 'react-toastify';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }
    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("number In Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rate"),
    }
    async populateGenres() {
        const { data: { body: genres } } = await getGenres();
        this.setState({ genres });
    }
    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return;
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) })
        }catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace('/notfound');
            }
        }

    }
    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }
    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }
    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
        toast.info("Done successfully");
    }
    render() {
        return (
            <div className='w-50 m-auto'>
                <h1> movie form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput('numberInStock', 'Number In Stock')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
                    {this.renderButton("save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;