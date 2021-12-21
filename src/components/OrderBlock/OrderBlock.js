import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate, formatMoney } from "utils";
import { Button, Tag } from "antd";
import "./OrderBlock.scss";
import Item from "antd/lib/list/Item";
import { Link } from "react-router-dom";
import { PRODUCTS_PATH } from "constant/route";

function OrderBlock({ data, onCancel }) {
    const { t } = useTranslation();
    const labelColor = {
        unconfirm: "orange",
        delivering: "blue",
        delivered: "green",
        cancelled: "red",
    };

    return (
        <div className="order-card">
            <div className="order-block">
                <div className="order-block__left">
                    <div className="order-detail">
                        <h4 className="order-code">
                            <span className="field-title">{t("order code")}: </span>
                            <span>#{data.id}</span>
                        </h4>
                        <p className="buy-date">
                            <span className="field-title">{t("buy date")}: </span>
                            <span>{formatDate(data.createdDate.toMillis())}</span>
                        </p>
                        <p className="delivery-address">
                            <span className="field-title">{t("delivery address")}: </span>
                            <span>{`${data?.address}${data.ward ? ", " + data.ward : ""} ${
                                data.district ? ", " + data.district : ""
                            }${data.province ? ", " + data.province : ""}`}</span>
                        </p>
                        <p className="payment-method">
                            <span className="field-title">{t("payment method")}: </span>
                            <span>{t(data.paymentMethod)}</span>
                        </p>
                        <p className="tax">
                            <span className="field-title">{t("tax")}: </span>
                            <span>{formatMoney((data.order.totalPrice * data.tax) / 100)} đ</span>
                        </p>
                        <p className="shipping-fee">
                            <span className="field-title">{t("shipping fee")}: </span>
                            <span>{formatMoney(data.shippingFee)} đ</span>
                        </p>
                        <div className="order-bill-total">
                            <span className="field-title">{t("bill")}: </span>
                            <span>
                                {formatMoney(
                                    data.order.totalPrice +
                                        data.shippingFee +
                                        (data.order.totalPrice * data.tax) / 100
                                )}{" "}
                                đ
                            </span>
                        </div>
                    </div>
                </div>
                <div className="order-block__right">
                    <ul className="product-list">
                        {data.order.products.map((item, index) => {
                            const { id, productName, productImage, unit, price } = item.data;
                            return (
                                <li className="product-item" key={id}>
                                    <div className="product-item__left">
                                        <img src={productImage} alt={id} />
                                    </div>
                                    <div className="product-item__right">
                                        <div className="product-info">
                                            <div className="product-title">
                                                <Link to={`${PRODUCTS_PATH}/${id}`}>
                                                    {productName}
                                                </Link>
                                            </div>
                                            <div className="product-count">
                                                {item.quantity} {unit}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(price)} đ
                                            </div>
                                        </div>
                                        <div className="product-total">
                                            <span>{formatMoney(price * item.quantity)} đ</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="order-action">
                <p className="order-status">
                    <span className="field-title">{t("status")}: </span>
                    <Tag color={labelColor[data.status]}>
                        <span className="status-text">{t(data.status)}</span>
                    </Tag>
                </p>
                {data.status === "unconfirm" && onCancel && (
                    <button className="btn" onClick={() => onCancel(data.id)}>
                        {t("cancel")}
                    </button>
                )}
            </div>
        </div>
    );
}

export default OrderBlock;
