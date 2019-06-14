import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
//Ctrl+Q quick view
const Pagination = props=>{
    const {itemsCount,pageSize,currentPage,onPageChance}=props;
    const pageCount=Math.ceil(itemsCount/pageSize);
    if(pageCount===1) return null;
    const pages=_.range(1,pageCount+1);

    console.log(currentPage);


    return(
        <nav>
            <ul className="pagination">
                {pages.map(page=>(
                    <li key={page}
                        className={page===currentPage?"page-item active":"page-item"}>
                        <a className="page-link"
                           onClick={()=>onPageChance(page)}>{page}
                        </a>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

Pagination.propTypes ={
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChance: PropTypes.func.isRequired
};
export default Pagination;
