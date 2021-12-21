import Admin from "pages/Admin";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Client from "pages/Client";
import {
  ROOT_PATH,
  ADMIN_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "constant/route";
import Signin from "pages/Authentication/Signin/Signin";
import Signup from "pages/Authentication/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

function MainRoute() {
  return (
    <Switch>
      <Route path={SIGN_IN_PATH}>
        <Signin />
      </Route>
      <Route path={SIGN_UP_PATH}>
        <Signup />
      </Route>
      <Route path={ADMIN_PATH}>
        <Admin></Admin>
      </Route>
      <Route path={ROOT_PATH}>
        <Client />
      </Route>
    </Switch>
  );
}

export default MainRoute;
