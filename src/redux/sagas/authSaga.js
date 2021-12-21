import { delay, join, put, spawn, takeLatest } from "redux-saga/effects";
import {
    signinFail,
    signinSuccess,
    SIGNIN_REQUEST,
    signupFail,
    signupSuccess,
    SIGNUP_REQUEST,
} from "redux/actions/authAction";
import authApi from "./../../apis/authApi";
import { ADMIN_PATH, ROOT_PATH } from "constant/route";
import history from "routing/history";
import { deleteAllCart } from "redux/actions/cartAction";
import i18n from "i18n.js";

function* sendSignupRequest({ payload }) {
    try {
        const sendTask = yield spawn(authApi.signup, payload);
        yield delay(700);
        const user = yield join(sendTask);
        yield put(signupSuccess(user));
        yield put(deleteAllCart())
        history.push(ROOT_PATH);
    } catch (error) {
        yield put(signupFail(error));
    }
}

function* sendSigninRequest({ payload: { email, password } }) {
    try {
        const sendTask = yield spawn(authApi.signin, email, password);
        yield delay(700);
        const user = yield join(sendTask);
        if(user?.status === "locked") {
            throw new Error(i18n.t("account is locked"))
        }
        yield put(signinSuccess(user));
        yield put(deleteAllCart()) 
        if (user.role === "admin") {
            history.push(ADMIN_PATH);
        } else {
            history.push(ROOT_PATH);
        }
    } catch (error) {
        yield put(signinFail(error));
    }
}

function* watchAuthRequest() {
    yield takeLatest(SIGNUP_REQUEST, sendSignupRequest);
    yield takeLatest(SIGNIN_REQUEST, sendSigninRequest);
}

export default watchAuthRequest;
