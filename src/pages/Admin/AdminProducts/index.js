import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { confirmModal, formatMoney } from "utils";
import { Link } from "react-router-dom";
import { ADD_PATH, ADMIN_MANAGE_PRODUCTS_PATH } from "constant/route";
import "../scss/AdminProducts.scss";
import {
    deleteProductRequest,
    getProductsFiltersRequest,
    getProductsRequest,
    searchProductsRequest,
} from "redux/actions/productsAction";
import { Pagination } from "antd";
import usePagination from "hooks/usePagination";
import Loading from "pages/Client/components/Loading";
import { changeFilterCategories, resetFilter } from "redux/actions/filterAction";

const { Search } = Input;
const { Option } = Select;

function AdminProducts() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const categoriesData = useSelector((state) => state.categories.data);
    
    const productsData = useSelector((state) => state.products.data);
    const filters = useSelector((state) => state.filters);
    const { currentData, totalPage, pageSize, setPaginationParam, currentPage } = usePagination(
        "products",
        5
    );
    const isSearching = useSelector((state) => state.products.isSearching);
    const isFetching = useSelector((state) => state.products.isFetching);

    const tableHeader = [
        "product name",
        "product image",
        "description",
        "quantity",
        "price",
        "action",
    ];

    useEffect(() => {
        dispatch(getProductsRequest());
    }, [dispatch]);

    useEffect(() => {
        setPaginationParam((state) => {
            return {
                ...state,
                page: 1,
            };
        });
    }, [filters, setPaginationParam]);

    useEffect(() => {
        dispatch(getProductsFiltersRequest(filters));
    }, [filters, dispatch]);

    function handleOnSearch(e) {
        const { value } = e.target;
        dispatch(resetFilter());
        setPaginationParam((state) => {
            return {
                ...state,
                page: 1,
            };
        });
        if (value) {
            dispatch(searchProductsRequest(value));
        } else {
            dispatch(getProductsRequest());
        }
    }

    function handleOnFilterChange(value) {
        dispatch(changeFilterCategories(value, false));
    }

    function handleOnDelete(productId) {
        confirmModal(t("warning"), t("delete product"), () => {
            dispatch(deleteProductRequest(productId));
        });
    }

    function handleOnChangePage(page, pageSize) {
        setPaginationParam({ page, pageSize });
    }

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <h2 className="title">{t("products management")}</h2>
            </div>
            <div className="admin-section__content">
                <div className="content-filter">
                    <div className="search-filter">
                        <Search placeholder={t("search")} onChange={handleOnSearch} enterButton />
                        <Link to={ADMIN_MANAGE_PRODUCTS_PATH + ADD_PATH}>
                            <i className="bx bx-plus"></i>
                        </Link>
                    </div>
                    <div className="categories-filter">
                        <span>{t("categories")}</span>
                        <div className="select-form">
                            <Select
                                defaultValue="all"
                                style={{ width: 200 }}
                                onChange={handleOnFilterChange}
                                value={
                                    filters.params.categories.value.length > 0
                                        ? filters.params.categories.value[0]
                                        : "all"
                                }
                            >
                                <Option value="all">{t("all categories")} </Option>
                                {categoriesData.map((item, index) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.title}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="content-table">
                    <table>
                        <thead>
                            <tr>
                                {tableHeader.map((item) => (
                                    <th key={item}>{t(item)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isSearching || isFetching ? (
                                <Loading />
                            ) : currentData.length === 0 ? (
                                <div className="data-notfound">{t("not products found")}</div>
                            ) : (
                                currentData.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="col-name">
                                                <Link
                                                    to={`${ADMIN_MANAGE_PRODUCTS_PATH}/${item.id}`}
                                                >
                                                    <span>{item.productName}</span>
                                                </Link>
                                            </td>
                                            <td className="col-image">
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                />
                                            </td>
                                            <td className="col-description">{item.description}</td>
                                            <td className="col-quantity">{item.quantity}</td>
                                            <td className="col-price">
                                                {formatMoney(item.price)} đ
                                            </td>
                                            <td className="col-action">
                                                <div className="action-wrapper">
                                                    <Link
                                                        to={`${ADMIN_MANAGE_PRODUCTS_PATH}/${item.id}`}
                                                    >
                                                        <i className="bx bxs-edit-alt"></i>
                                                    </Link>
                                                    <i
                                                        className="bx bx-trash"
                                                        onClick={() => handleOnDelete(item.id)}
                                                    ></i>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                    {productsData.length > 0 && (
                        <div className="table-pagination">
                            <Pagination
                                current={currentPage}
                                total={totalPage}
                                pageSize={pageSize}
                                onChange={handleOnChangePage}
                                pageSizeOptions={[5, 10, 15, 20]}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AdminProducts;
