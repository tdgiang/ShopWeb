import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";
import { Pagination } from "antd";
import usePagination from "hooks/usePagination";
import { resetFilter } from "redux/actions/filterAction";

function ProductsShow( {data, handleOnSortChange }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.products.isFetching);
  const isSearching = useSelector((state) => state.products.isSearching);
  const { currentData, totalPage, pageSize, setPaginationParam, currentPage } =
    usePagination("products", 16);
  useEffect(() => {
    setPaginationParam((state) => {
      return {
        ...state,
        page: 1,
      };
    });
  }, [setPaginationParam]);

  function handleOnChangePage(page, pageSize) {
    setPaginationParam({ page, pageSize });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <section className="products-show">
      <div className="products-show__header">
        <div className="header-left">
          <span>
            {t("result length")}: {data.length}
          </span>
        </div>
        <div className="header-right">
          <p className="sort-text">{t("sort by")}</p>
          <select name="sort-by" id="sort-by" onChange={handleOnSortChange}>
            <option value="default">{t("default")}</option>
            <option value="asc">{t("price asc")}</option>
            <option value="desc">{t("price desc")}</option>
          </select>
          <i className="bx bxs-down-arrow"></i>
        </div>
      </div>
      <div className="products-show__body">
        {isFetching || isSearching ? (
          <Loading />
        ) : data.length > 0 ? (
          <ul className="products-list">
            {data.map((item, index) => (
              <li key={index}>
                <ProductItem item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="data-notfound">{t("not products found")}</div>
        )}
      </div>
      {/* {data.length > 0 && (
        <div className="products-show__footer">
          <Pagination
            current={currentPage}
            total={totalPage}
            pageSize={pageSize}
            data={data}
            onChange={handleOnChangePage}
            pageSizeOptions={[5, 10, 15, 20]}
            className="custom-pagination"
            showSizeChanger={false}
          />
        </div>
      )} */}
    </section>
  );
}

export default ProductsShow;
