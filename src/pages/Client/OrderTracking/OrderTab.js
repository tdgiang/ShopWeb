import { Empty, Pagination } from "antd";
import OrderBlock from "components/OrderBlock/OrderBlock";
import { db } from "firebase-config";
import usePagination from "hooks/usePagination";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateOrderRequest } from "redux/actions/ordersAction";
import { confirmModal } from "utils";

function OrderTab({ status }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const { currentData, totalPage, pageSize, setPaginationParam, currentPage, setTotalData } =
        usePagination("orders", 3);

    useEffect(() => {
        const ordersListener = db
            .collection("orders")
            .where("userId", "==", currentUser.id)
            .where("status", "==", status)
            .orderBy("createdDate", "desc")
            .onSnapshot((snapshot) => {
                const data = [];
                snapshot.forEach(function (doc) {
                    data.push({ id: doc.id, ...doc.data() });
                });

                setTotalData(data);
            });

        return ordersListener;
    }, []);

    function handleOnCancelOrder(orderId) {
        confirmModal(t("warning"), t("remove order"), () => {
            dispatch(
                updateOrderRequest({
                    id: orderId,
                    status: "cancelled",
                })
            );
            toast.success(t("cancel order success"));
        });
    }

    function handleOnChangePage(page, pageSize) {
        setPaginationParam({ page, pageSize });
    }

    if (currentData.length <= 0) {
        return <div className="user-order-empty">{t("user order empty")}</div>;
    }

    return (
        <>
            <div className="user-order-list">
                {currentData.map((item) => {
                    return <OrderBlock data={item} onCancel={handleOnCancelOrder} key={item.id} />;
                })}
            </div>
            <Pagination
                current={currentPage}
                total={totalPage}
                pageSize={pageSize}
                onChange={handleOnChangePage}
                pageSizeOptions={[5, 10, 15, 20]}
                showSizeChanger={false}
            />
        </>
    );
}

export default OrderTab;
