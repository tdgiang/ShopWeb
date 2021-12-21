import React, { useEffect } from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import AdminProducts from "./AdminProducts";
import "./scss/Admin.scss";

import { useDispatch } from "react-redux";
import { getCategoriesRequest } from "redux/actions/categoriesAction";
import { getProductsRequest } from "redux/actions/productsAction";
import { Route, Switch } from "react-router-dom";
import {
    ADMIN_CATEGOIES_PATH,
    ADMIN_MANAGE_PRODUCTS_PATH,
    ADMIN_ORDERS_PATH,
    ADMIN_PATH,
    ADMIN_PRODUCTS_PATH,
    ADMIN_USERS_PATH,
    ADMIN_VOUCHERS_PATH
} from "constant/route";
import ProductManage from "./AdminProducts/ProductManage";
import AdminDashboard from "./AdminDashboard";
import AdminCategories from "./AdminCategories";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import OrderDetail from "./AdminOrders/OrderDetail";
import AdminVouchers from "./AdminVouchers";

function Admin() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsRequest());
        dispatch(getCategoriesRequest());
    }, [dispatch]);
    
    return (
        <div className="admin">
            <AdminHeader></AdminHeader>
            <main className="admin-main">
                <div className="admin-main__left">
                    <AdminSidebar></AdminSidebar>
                </div>
                <div className="admin-main__right">
                    <Switch>
                        <Route path={ADMIN_PATH} exact>
                            <AdminDashboard></AdminDashboard>
                        </Route>
                        <Route path={ADMIN_MANAGE_PRODUCTS_PATH + "/:productId"}>
                            <ProductManage></ProductManage>
                        </Route>
                        <Route path={ADMIN_PRODUCTS_PATH}>
                            <AdminProducts></AdminProducts>
                        </Route>
                        <Route path={ADMIN_CATEGOIES_PATH}>
                            <AdminCategories></AdminCategories>
                        </Route>
                        <Route path={ADMIN_USERS_PATH}>
                            <AdminUsers></AdminUsers>
                        </Route>
                        <Route path={ADMIN_ORDERS_PATH + "/:orderId"}>
                            <OrderDetail></OrderDetail>
                        </Route>
                        <Route path={ADMIN_ORDERS_PATH}>
                            <AdminOrders></AdminOrders>
                        </Route>
                        <Route path={ADMIN_VOUCHERS_PATH}>
                            <AdminVouchers></AdminVouchers>
                        </Route>
                        <Route path="*">
                            <div>404</div>
                        </Route>
                    </Switch>
                </div>
            </main>
        </div>
    );
}

export default Admin;
