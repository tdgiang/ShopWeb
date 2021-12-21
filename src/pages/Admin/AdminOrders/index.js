import { Input, Pagination, Select, Table, Tag } from "antd";
import { ADMIN_ORDERS_PATH } from "constant/route";
import { db } from "firebase-config";
import usePagination from "hooks/usePagination";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersRequest, getAllOrdersSuccess } from "redux/actions/ordersAction";
import { formatMoney } from "utils";
import "../scss/AdminOrders.scss";

const { Search } = Input;
const { Option } = Select;

function AdminOrders() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { currentData, totalPage, pageSize, setPaginationParam, currentPage, setCurrentData } =
        usePagination("orders", 10);
    const [orderFilter, setOrderFilter] = useState({
        status: {
            label: "status",
            operator: "==",
            value: "",
        },
        orderId: {
            label: "id",
            operator: "==",
            value: "",
        },
    });

    useEffect(() => {
        dispatch(getAllOrdersRequest());
    }, []);

    useEffect(() => {
        let query = db.collection("orders");

        for (let key in orderFilter) {
            const { label, operator, value } = orderFilter[key];
            if (value && value !== "all") {
                query = query.where(label, operator, value);
            }
        }

        const ordersListener = query.orderBy("createdDate", "desc").onSnapshot((snapshot) => {
            const data = [];
            snapshot.forEach(function (doc) {
                data.push({ id: doc.id, ...doc.data() });
            });
            dispatch(getAllOrdersSuccess(data));
            setPaginationParam((state) => {
                return {
                    ...state,
                    page: 1,
                };
            });
        });

        return ordersListener;
    }, [orderFilter, setCurrentData, dispatch, setPaginationParam]);

    const labelData = ["unconfirm", "delivering", "delivered", "cancelled"];

    const labelColor = {
        unconfirm: "orange",
        delivering: "blue",
        delivered: "green",
        cancelled: "red",
    };

    const columns = [
        {
            title: t("order code"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("customer"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("phoneNumber"),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: t("address"),
            dataIndex: "address",
            key: "address",
            render: (address, { ward, district, province }) => (
                <span>{`${address}${ward ? ", " + ward : ""} ${
                    district ? ", " + district : ""
                }${province ? ", " + province : ""}`}</span>
            ),
        },
        {
            title: t("product quantity"),
            dataIndex: ["order", "totalQuantity"],
            key: ["order", "totalQuantity"],
        },
        {
            title: t("total"),
            dataIndex: ["order", "totalPrice"],
            key: ["order", "totalQuantity"],
            render: (price) => <span>{formatMoney(price)} đ</span>,
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={labelColor[status]}>
                    <span className="status-text">{t(status)}</span>
                </Tag>
            ),
        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <Link to={ADMIN_ORDERS_PATH + `/${record.id}`}>{t("detail")}</Link>
            ),
        },
    ];

    function handleOnSearch(value) {
        setOrderFilter((state) => {
            return {
                status: {
                    label: "status",
                    operator: "==",
                    value: "all",
                },
                orderId: {
                    label: "id",
                    operator: "==",
                    value: value,
                },
            };
        });
    }

    function handleOnSearchChange(e) {
        e.preventDefault();
        const { value } = e.target;
        if (!value) {
            setOrderFilter((state) => {
                return {
                    status: {
                        label: "status",
                        operator: "==",
                        value: "all",
                    },
                    orderId: {
                        label: "id",
                        operator: "==",
                        value: value,
                    },
                };
            });
        }
    }

    function handleOnStatusChange(value) {
        setOrderFilter((state) => {
            return {
                ...state,
                status: {
                    label: "status",
                    operator: "==",
                    value: value,
                },
            };
        });
    }

    function handleOnChangePage(page, pageSize) {
        setPaginationParam({ page, pageSize });
    }

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <h2 className="title">{t("orders manage")}</h2>
            </div>
            <div className="admin-section__content">
                <div className="content-filter">
                    <div className="search-filter">
                        <Search
                            placeholder={t("search")}
                            onChange={handleOnSearchChange}
                            onSearch={handleOnSearch}
                            enterButton
                        />
                    </div>
                    <div className="categories-filter">
                        <span>{t("order status")}</span>
                        <div className="select-form">
                            <Select
                                defaultValue="all"
                                style={{ width: 200 }}
                                onChange={handleOnStatusChange}
                                value={orderFilter.status.value ? orderFilter.status.value : "all"}
                            >
                                <Option value="all">{t("all")} </Option>
                                {labelData.map((item, index) => (
                                    <Option value={item} key={item}>
                                        {t(item)}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="orders-content">
                    <div className="orders-content__table">
                        <Table columns={columns} dataSource={currentData} pagination={false} />
                    </div>
                    {currentData.length > 0 && (
                        <div className="orders-content__pagination">
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

export default AdminOrders;
