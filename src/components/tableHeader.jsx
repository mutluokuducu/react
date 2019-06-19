import React, {Component} from 'react';
//columns:array
//sortColumn:obj
//onsort:fun
class TableHeader extends Component {

    renderSortIcon1 = {};

    raiseSort = path => {

        const sortColumn = {...this.props.sortColumn};

        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';

        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }

        this.props.onSort(sortColumn)

    };

    renderSortIcon=column=>{
       const {iconColumn} = this.props;
        console.log(iconColumn,"hhhh");

        if (column.path !== iconColumn.path) {
            return null;
        }

        if (iconColumn.order === 'asc') {
            return <i className="fa fa-sort-asc"/>;
        } else {
            return <i className="fa fa-sort-desc"/>;
        }
    };

    render() {

        const iconColumn = {...this.props.sortColumn};

        console.log(this.props.iconColumn, "mmmmmss");

        return (
            <thead>
            <tr className="iconCursor">
                {this.props.columns.map(column =>

                    <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
                        {column.label}{this.renderSortIcon(column)}
                    </th>)}
            </tr>

            </thead>


        );

    }
}

export default TableHeader;
