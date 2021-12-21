import React from "react";
import '../scss/Pagination.scss'

function Pagination() {
    const _page = 2;

    function handleOnClickPageBtn(event, pageValue) {
        event.preventDefault();
    }

    function renderPagegBtn(length) {
        let btns = [];
        for (let i = 1; i <= length; i++) {
            let btn = (
                <li className={`pagination-item ${_page === i && "active"}`} key={i}>
                    <a href="/" onClick={(e) => handleOnClickPageBtn(e, i)}>
                        {i}
                    </a>
                </li>
            );
            btns.push(btn);
        }
        return btns;
    }

    return (
        <div className="products-pagination">
            <a
                href="/"
                className="first-page-btn"
                onClick={(e) => handleOnClickPageBtn(e, _page - 1)}
            >
                <i className="bx bx-left-arrow-alt"></i> 
            </a>
            <ul className="pagination-list">{renderPagegBtn(7)}</ul>
            <a
                href="/"
                className="last-page-btn"
                onClick={(e) => handleOnClickPageBtn(e, _page + 1)}
            >
                <i className="bx bx-right-arrow-alt"></i> 
            </a>
        </div>
    );
}

export default Pagination;
