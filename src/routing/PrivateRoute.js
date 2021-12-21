import { SIGN_IN_PATH } from "constant/route";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    const currentUser = useSelector((state) => state.auth.currentUser);
    return <Route {...rest}>
        {currentUser?.role !== "admin" ? <Redirect to={SIGN_IN_PATH} /> : children}
        </Route>;
}

export default PrivateRoute;
