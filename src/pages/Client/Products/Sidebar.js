import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "utils";

import Stars from "../components/Stars";
import {
  changeFilterPriceRange,
  changeFilterRating,
} from "redux/actions/filterAction";
function Sidebar(props) {
  const {
    setReset,
    data,
    setSearchProduct,
    searchProduct,
    handleOnCategoryChange,
    handleOnRatingChange,
    handleOnPriceRangeChange,
  } = props;
  const dispatch = useDispatch();
  const categoriesData = [
    {
      id: "X63OeZXLKAqyVcAm38aT",
      title: "Thịt",
    },
    {
      id: "Y4wlWVRg8AUjnGt8zjJC",
      title: "Rau củ",
    },
    {
      id: "D12YC358aOe71ZVhrdOf",
      title: "Đồ hộp",
    },
    {
      id: "wVaMcDH4yni65ls9aY3C",
      title: "Thực phẩm khác",
    },
  ];
  // const activeCategories = useSelector((state) => state.filters.params.categories.value);
  // const activeRating = useSelector((state) => state.filters.params.rating.value);
  // const fromPrice = useSelector((state) => state.filters.params.fromPrice.value);
  // const toPrice = useSelector((state) => state.filters.params.toPrice.value);
  const { t } = useTranslation();

  const ratingData = [5, 4, 3, 2, 1];

  const priceRangeData = [
    {
      from: 1000,
      to: 10000,
    },
    {
      from: 10000,
      to: 30000,
    },
    {
      from: 30000,
      to: 60000,
    },
    {
      from: 60000,
      to: 100000,
    },
    {
      from: 100000,
      to: 200000,
    },
  ];

  // const handleOnFormRangeChange = (e) => {
  //     e.preventDefault();
  //     const rangeData = {
  //         from: parseFloat(e.target[0].value),
  //         to: parseFloat(e.target[1].value),
  //     };
  //     dispatch(changeFilterPriceRange(rangeData));
  // };

  const [active, setActive] = useState();
  const [activeRate, setActiveRate] = useState();
  const [activePrice, setActivePrice] = useState();

  return (
    <aside className="products-sidebar">
      <div className="sidebar-block">
        <h3 className="block-title">{t("search")}</h3>
        <form
          action="/"
          className="search-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="search-input text-input"
            placeholder={t("search keyword")}
            onChange={(e) => setSearchProduct(e.target.value)}
            value={searchProduct}
          />
          <button type="submit" className="btn search-btn">
            <i className="bx bx-search-alt-2"></i>
          </button>
        </form>
      </div>
      <div className="sidebar-block">
        <h3 className="block-title">{t("categories")}</h3>
        <ul className="categories-list">
          {categoriesData.length > 0 &&
            categoriesData.map((item) => (
              <li className="categories-item" key={item.id}>
                <span
                  className={`categories-link ${
                    active?.id === item.id ? "active" : ""
                  }`}
                  onClick={() => {
                    handleOnCategoryChange(item.id);
                    setActive(item);
                  }}
                >
                  <i className="bx bxs-right-arrow"></i>
                  <span>{item.title}</span>
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div className="sidebar-block">
        <h3 className="block-title">{t("rating")}</h3>
        <ul className="rating-list">
          {ratingData.map((item, index) => (
            <li
              className={`rating-item ${activeRate == item ? "active" : ""}`}
              key={index}
              onClick={() => {
                handleOnRatingChange(item);
                setActiveRate(item);
              }}
            >
              <Stars starsNumber={item}></Stars>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-block">
        <h3 className="block-title">{t("price range")}</h3>
        <ul className="price-range-list">
          {priceRangeData.map((item, index) => (
            <li
              key={index}
              className={
                item.from === activePrice?.from && item.to === activePrice?.to
                  ? "active"
                  : ""
              }
              onClick={() => {
                handleOnPriceRangeChange(item);
                setActivePrice(item);
              }}
            >
              <span>{formatMoney(item.from)}</span>
              <span className="sign">-</span>
              <span>{formatMoney(item.to)}</span>
              <span className="money-unit">VNĐ</span>
            </li>
          ))}
        </ul>
        {/* <form
            action="/"
            className="price-range-form"
            onSubmit={handleOnFormRangeChange}
          >
            <div className="range-input">
              <label htmlFor="from-input">{t("from")}</label>
              <input type="number" id="from-input" className="text-input" />
            </div>
            <div className="range-input">
              <label htmlFor="to-input">{t("to")}</label>
              <input type="number" id="to-input" className="text-input" />
            </div>
            <button type="submit" className="btn search-btn">
              {t("filter")}
            </button>
          </form> */}
      </div>
    </aside>
  );
}

export default Sidebar;
