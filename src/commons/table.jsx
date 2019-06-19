import React from 'react';
import TableHeader from "../components/tableHeader";
import TableBody from "../components/tableBody";

//rsc create function
const Table = ({columns,sortColumn,iconColumn,onSort,data}) => {
    return (
        <table className="table">
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                iconColumn={iconColumn}
                onSort={onSort}

            />
            <TableBody
                data={data}
                columns={columns}
            />

        </table>
    );
};

export default Table;
