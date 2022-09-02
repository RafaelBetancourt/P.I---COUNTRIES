import React from 'react';
import './Paginate.css';

export default function Paginate({ currentPage, setCurrentPage, totalCountries, countriesPerPage }) {
    
    const totalPages = Math.ceil((totalCountries - 9) / countriesPerPage) + 1;
    let pages = [];
    for (let p = 1; p <= totalPages; p++) {
        pages.push(p);
    }
    console.log('totalpages' + totalPages + ' currentpage ' + currentPage)
    if (totalPages < currentPage) {
        setCurrentPage(1);
    }
    return (
        <div>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && `disabled`}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                        &laquo;
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${page === currentPage && `active`}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        <button className="page-link">{page}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages && `disabled`}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
};