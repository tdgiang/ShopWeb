import React from "react";
import Stars from "../components/Stars";
import { formatMoney } from "utils";
import "../scss/TinyProduct.scss";

function TinyProduct({ data }) {
    return (
        <div className="tiny-product">
            <div className="tiny-product__left">
                <img src={data.image} alt={data.name} />
            </div>
            <div className="tiny-product__right">
                <p className="tiny-title">{data.name}</p>
                <Stars starsNumber={data.rating}></Stars>
                <p className="tiny-price">
                    <span>{formatMoney(data.price)}</span>
                    <span>VNĐ</span>
                </p>
            </div>
        </div>
    );
}

export default TinyProduct;
