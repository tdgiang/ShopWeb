import { Tabs } from "antd";
import { db } from "firebase-config";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import "../scss/OrderTracking.scss";
import OrderTab from "./OrderTab";

const { TabPane } = Tabs;

function OrderTracking() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        const ordersListener = db
            .collection("orders")
            .where("userId", "==", currentUser.id)
            .orderBy("createdDate", "desc")
            .onSnapshot((snapshot) => {
                const data = [];
                snapshot.forEach(function (doc) {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setOrdersData(data);
                setIsLoading(false);
            });

        return ordersListener;
    }, [currentUser]);

    const labelData = ["unconfirm", "delivering", "delivered", "cancelled"];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="order-tracking">
            <h3 className="order-tracking__title">{t("order tracking")}</h3>
            <div className="order-tracking__content">
                {ordersData.length <= 0 ? (
                    <div className="order-empty">{t("orders empty")}</div>
                ) : (
                    <Tabs defaultActiveKey="1" size="large" style={{ marginBottom: 32 }}>
                        {labelData.map((item) => {
                            return (
                                <TabPane tab={t(item)} key={item}>
                                    <OrderTab status={item}></OrderTab>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                )}
            </div>
        </section>
    );
}

export default OrderTracking;
