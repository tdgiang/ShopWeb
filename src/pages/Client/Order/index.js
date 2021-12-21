import { PRODUCTS_PATH } from "constant/route";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../scss/Order.scss";

function Order() {
    const { t } = useTranslation();
    return (
        <section className="order">
            <div className="order-success">
                <div className="order-success__logo">
                    <i class="bx bxs-check-circle"></i>
                </div>
                <div className="order-success__thanks">
                    <h3>{t("thanks")}</h3>
                    <p>{t("order received")}</p>
                </div>
                <Link to={PRODUCTS_PATH}>{t("continue shoping")}</Link>
            </div>
        </section>
    );
}

export default Order;
