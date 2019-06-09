import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getMovies} from "../services/fakeMovieService";

class movies extends Component {

    state = {
        movies: getMovies()
    };
    handleDelete = (movie) => {
       const movies=this.state.movies.filter(m=>m._id!==movie._id);
       this.setState({movies:movies})
    };

    render() {
        const {length:count}=this.state.movies;
        if (count===0)
            return <h3><p>There are no movies in database</p></h3>;
        return (
            <React.Fragment>
                <h3> <p>Showing movies : {count}</p></h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <button onClick={()=> this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm">Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </React.Fragment>

        );
    }
}

export default movies;
