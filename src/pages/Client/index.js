import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "redux/actions/categoriesAction";
import { getProductsRequest } from "redux/actions/productsAction";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./Products";
import ProdcutDetail from "./ProductDetail";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import { PRODUCTS_PATH, CART_PATH, CHECKOUT_PATH, ORDER_PATH, ROOT_PATH, ORDER_TRACKING_PATH, SIGN_IN_PATH } from "constant/route";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Order from "./Order";
import Home from "./Home";
import OrderTracking from "./OrderTracking";

function Client() {
    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        dispatch(getProductsRequest());
        dispatch(getCategoriesRequest());
    }, [dispatch]);

    return (
        <>
            <Header></Header>
            <Switch>
                <Route path={ROOT_PATH} exact>
                    <Home></Home>
                </Route>
                <main className="main-content main-products">
                    <Route path={PRODUCTS_PATH} exact>
                        <Products></Products>
                    </Route>
                    <Route path={`${PRODUCTS_PATH}/:productId`}>
                        <ProdcutDetail></ProdcutDetail>
                    </Route>
                    <Route path={CART_PATH}>
                        <Cart></Cart>
                    </Route>
                    <Route path={CHECKOUT_PATH}>
                        <Checkout></Checkout>
                    </Route>
                    <Route path={ORDER_PATH}>
                        <Order></Order>
                    </Route>
                    <Route path={ORDER_TRACKING_PATH}>
                        {currentUser ? <OrderTracking></OrderTracking> : <Redirect to={SIGN_IN_PATH} />}
                    </Route>
                </main>
                <Route path="*">
                    <div>404</div>
                </Route>
            </Switch>
            <Footer></Footer>
        </>
    );
}

export default Client;
