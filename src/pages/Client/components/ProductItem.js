import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addCart } from "redux/actions/cartAction";
import { formatMoney } from "utils";
import { PRODUCTS_PATH } from "constant/route";
import "../scss/ProductItem.scss";
import "../scss/ProductItem.scss";
import Stars from "./../components/Stars";

function ProductItem({ item }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { t } = useTranslation();

    function handleOnCartClick(item) {
        toast.success(t("add cart success"));
        dispatch(addCart(item));
    }

    const handeSaveLocal = (item) => {
        localStorage.setItem("getData", JSON.stringify(item.id))
        console.log("item", item);
    }

    return (
      <div className="product-item">
        <div className="product-item__top">
          <img src={item.productImage} alt={item.productName} />
        </div>
        <div className="product-item__bottom">
          <Link to={`${PRODUCTS_PATH}/${item.id}`} className="product-title">
            <div onClick={() => handeSaveLocal(item)}>{item.productName}</div>
          </Link>
          <Stars starsNumber={item.rating}></Stars>
          <p className="product-description">{item.description}</p>
          <div className="product-foot">
            <div className="product-price">
              <span>{formatMoney(item.price)}</span>
              <span>đ</span>
            </div>
            <button
              type="button"
              className="btn search-btn"
              onClick={() => handleOnCartClick(item)}
            >
              <i className="bx bxs-cart-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
}

export default ProductItem;
