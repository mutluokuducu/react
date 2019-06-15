import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import Like from '../commons/like';
import ListGroup from '../commons/listGroup';
import Pagination from '../commons/pagination';
import {paginate} from '../utils/paginate';
import {getGenres} from '../services/fakeGenreService'


class movies extends Component {

    state = {
        movies: [],
        genres:[],
        currentPage:1,
        pageSize:4
    };
    componentDidMount() {
        const genres=[{name:'All Genres'},...getGenres()]
       this.setState({
           movies:getMovies(),
           genres
       });
    }

    handleDelete = (movie) => {
       const movies=this.state.movies.filter(m=>m._id!==movie._id);
       this.setState({movies:movies})
    };
    handleLike=(movie)=>{
        const movies=[...this.state.movies];
        const  index=movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked=!movies[index].liked;
        this.setState({movies});
        //console.log(movies[index].liked);
    };
    handlePageChance =page=>{
     this.setState({currentPage:page})
    };
    handleGenreSelect=genre=>{
        this.setState({selectedGenre:genre,currentPage:1})
    };

    render() {
        const {length:count}=this.state.movies;
        const {currentPage,pageSize,selectedGenre,movies:allMovies}=this.state;

        if (count===0)
            return <h3><p>There are no movies in database</p></h3>;

        const filtered=selectedGenre && selectedGenre._id
            ?allMovies.filter(m=>m.genre._id===selectedGenre._id)
            :allMovies;
        const movies=paginate(filtered,currentPage,pageSize);
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">

                    <h3> <p>Showing movies : {filtered.length}</p></h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            movies.map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/>
                                    </td>
                                    <td>
                                        <button onClick={()=> this.handleDelete(movie)}
                                                className="btn btn-danger btn-sm">Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChance={this.handlePageChance}
                    />
                </div>

            </div>

        );
    }
}

export default movies;
