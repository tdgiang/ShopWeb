import React from "react";
import "../scss/Stars.scss";

function Stars({ starsNumber }) {
    function renderStars(length = 5) {
        let starsList = [];
        for (let i = 1; i <= 5; i++) {
            let starItem = (
                <li key={i}>
                    <i className={`${length ? "bxs-star" : "bx-star"} bx`}></i>
                </li>
            );
            starsList.push(starItem);
            if (length) {
                --length;
            }
        }
        return starsList;
    }

    return <ul className="stars-list">{renderStars(starsNumber)}</ul>;
}

export default Stars;
