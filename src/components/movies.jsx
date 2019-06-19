import React, {Component} from 'react';
import {getMovies} from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import ListGroup from '../commons/listGroup';
import Pagination from '../commons/pagination';
import {paginate} from '../utils/paginate';
import {getGenres} from '../services/fakeGenreService'
import _ from 'lodash';


class movies extends Component {

    state = {
        movies: [],
        genres:[],
        currentPage:1,
        pageSize:4,
        sortColumn:{path:'title',order:'asc'}
    };
    componentDidMount() {
        const genres=[{_id:'',name:'All Genres'},...getGenres()]
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
    handleSort=sortColumn=>{

      this.setState({sortColumn})
    };

    render() {
        //console.log(this.state.sortColumn,"movi");
        const {length:count}=this.state.movies;
        const {
            currentPage,
            pageSize,
            sortColumn,
            selectedGenre,
            movies:allMovies

        }=this.state;

        if (count===0)
            return <h3><p>There are no movies in database</p></h3>;

        function getData() {
//filtered
            const filtered = selectedGenre && selectedGenre._id
                ? allMovies.filter(m => m.genre._id === selectedGenre._id)
                : allMovies;
//shorted
            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);


//paginate
            const movies = paginate(sorted, currentPage, pageSize);
            return {filtered, movies};
        }

        const {filtered, movies} = getData();

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

                    <MoviesTable
                    movies={movies}
                    sortColumn={this.sortColumn}
                    iconColumn={this.state.sortColumn}
                    onDelete={this.handleDelete}
                    onLike={this.handleLike}
                    onSort={this.handleSort}

                    />
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
