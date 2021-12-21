import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAllCart, deleteCart, setQuantity } from "redux/actions/cartAction";
import { confirmModal, formatMoney } from "utils";
import "../scss/Cart.scss";
import CartTableRow from "./CartTableRow";
import { PRODUCTS_PATH, CHECKOUT_PATH } from "constant/route";

function Cart() {
    const { t } = useTranslation();
    const cartProducts = useSelector((state) => state.cart.products);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    const tableHeader = ["product", "price", "quantity", "total", "delete"];

    const handleOnDeleteCart = (productId) => {
        confirmModal(t("warning"), t("delete cart"), () => {
            dispatch(deleteCart(productId));
            toast.success(t("delete success"));
        });
    };

    const handleOnDeleteAllCart = (e) => {
        e.preventDefault();
        confirmModal(t("warning"), t("delete all cart"), () => {
            dispatch(deleteAllCart());
            toast.success(t("delete success"));
        });
    };

    const handleChangeQuantity = (productId, quantity) => {
        dispatch(setQuantity(productId, parseFloat(quantity)));
    };

    if (cartProducts.length <= 0) {
        return (
            <section className="cart-main cart-empty">
                <h2 className="cart-main__title">{t("cart")}</h2>
                <div className="empty-alert">
                    <h2>{t("cart empty alert")}</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="cart-main">
            <h2 className="cart-main__title">{t("cart")}</h2>
            <div className="cart-table">
                <table>
                    <thead>
                        <tr>
                            {tableHeader.map((item, index) => (
                                <th key={index}>{t(item)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cartProducts.map(({ data, quantity }, index) => {
                            return (
                                <CartTableRow
                                    data={data}
                                    quantity={quantity}
                                    changeQuantity={handleChangeQuantity}
                                    deleteCart={handleOnDeleteCart}
                                    key={index}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="continue-shopping">
                <button
                    type="button"
                    className="btn btn-link btn-cancel"
                    onClick={handleOnDeleteAllCart}
                >
                    {t("cancel cart")}
                </button>
                <Link to={PRODUCTS_PATH} className="btn btn-link">
                    {t("continue shoping")}
                </Link>
            </div>
            <div className="bill-wrapper">
                <div className="bill">
                    <div className="bill-content">
                        <span className="left">{t("sub total")}</span>
                        <span className="left">{formatMoney(totalPrice)} đ</span>
                    </div>
                    <div className="bill-content">
                        <span className="left">{t("tax")}</span>
                        <span className="left">{formatMoney((totalPrice * 10) / 100)} đ</span>
                    </div>
                    <hr />
                    <div className="bill-content total-payment">
                        <span className="left">{t("total pay")}</span>
                        <span className="left">
                            {formatMoney(totalPrice + (totalPrice * 10) / 100)} đ
                        </span>
                    </div>
                </div>
                <Link to={CHECKOUT_PATH} className="btn btn-link ">
                    {t("checkout")}
                </Link>
            </div>
        </section>
    );
}

export default Cart;
