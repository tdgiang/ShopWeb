import OrderBlock from "components/OrderBlock/OrderBlock";
import { db } from "firebase-config";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import history from "routing/history";
import { Select } from "antd";
import Loading from "pages/Client/components/Loading";
import { useDispatch } from "react-redux";
import { updateOrderRequest } from "redux/actions/ordersAction";

const { Option } = Select;

function OrderDetail() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const orderListener = db
            .collection("orders")
            .doc(orderId)
            .onSnapshot((doc) => {
                setOrderData({ id: doc.id, ...doc.data() });
            });
        return orderListener;
    }, [orderId]);

    const goBack = () => {
        history.goBack();
    };

    const labelData = ["unconfirm", "delivering", "delivered", "cancelled"];

    const handleOnChange = (value) => {
        dispatch(updateOrderRequest({id: orderId, status: value}))
    }

    if(!orderData) {
        return <Loading/>
    }

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <i class="bx bx-arrow-back" onClick={goBack}></i>
                <h2 className="title">{t("orders detail")}</h2>
            </div>
            <div className="admin-section__content">
                {orderData && <OrderBlock data={orderData}></OrderBlock>}
                <div className="status-change">
                    <span>{t("status change")}: </span>
                    <Select defaultValue="lucy" style={{ width: 150 }} value={orderData.status} onChange={handleOnChange} showArrow={false}>
                        {labelData.map((item) => {
                            return <Option value={item}>{t(item)}</Option>;
                        })}
                    </Select>
                </div>
            </div>
        </section>
    );
}

export default OrderDetail;
