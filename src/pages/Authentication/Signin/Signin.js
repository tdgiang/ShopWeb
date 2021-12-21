import BtnLoading from "components/Loading/BtnLoading";
import { SIGN_UP_PATH } from "constant/route";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signinRequest } from "redux/actions/authAction";
import { emailRegex } from "utils";
import InputText from "../../../components/InputText/InputText";

function Signin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const signinError = useSelector((state) => state.auth.signinError);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = ({ email, password }) => {
    dispatch(signinRequest(email, password));
  };

  return (
    <main className="main-content auth-main">
      <h1 className="logo">
        <i className="lab la-envira"></i>
        <span>Tây bắc</span>
      </h1>
      <div className="auth-content">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="auth-title">{t("signin")}</h2>
          <div className="row-block">
            <InputText
              control={control}
              fieldName="email"
              error={errors.email}
              validatePattern={emailRegex}
            />
          </div>
          <div className="row-block">
            <InputText
              control={control}
              fieldName="password"
              error={errors.password}
              type="password"
            />
          </div>
          {signinError && (
            <span className="error-message error-message--mb">
              {t(signinError.message)}
            </span>
          )}

          <button className={"primary-btn"} type="submit">
            {isLoading ? <BtnLoading /> : t("signin")}
          </button>
          <p className="signin-text">
            <span>{t("you not have an account")}</span>
            <Link to={SIGN_UP_PATH}>{t("signup")}</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Signin;
