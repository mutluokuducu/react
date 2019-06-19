import React, {Component} from 'react';
import Like from "../commons/like";
import Table from '../commons/table'

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {

            key: 'like',
            content: movie =>(
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>)
        },
        {

            key: 'delete',
            content: movie=>(
                <button onClick={() =>this.props.onDelete(movie)} className="btn btn-danger btn-sm">
                Delete
            </button>)
        }
    ];


    render() {

       // console.log(this.props.iconColumn,"icon");
        const {movies, sortColumn, onSort,iconColumn} = this.props;

        return (
            <Table
                columns={this.columns}
                data={movies}
                iconColumn={iconColumn}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default MoviesTable;

              {/*
               <tbody>
                {
                    movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onClick={()=>onLike(movie)}/>
                            </td>
                            <td>
                                <button onClick={()=> onDelete(movie)}
                                        className="btn btn-danger btn-sm">Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
                */}



