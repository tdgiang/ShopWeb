import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store, { persistor } from "redux/store";
import App from "./App";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";
import "assets/scss/_grobal.scss";
import reportWebVitals from "./reportWebVitals";

import { PersistGate } from "redux-persist/lib/integration/react";
import history from "routing/history";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<div>Loading... </div>}>
                <PersistGate loading={<div>Loading... </div>} persistor={persistor}>
                    <Router history={history}>
                        <App />
                    </Router>
                </PersistGate>
            </Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
