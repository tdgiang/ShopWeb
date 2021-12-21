import InputSelect from "components/InputSelect/InputSelect";
import BtnLoading from "components/Loading/BtnLoading";
import { SIGN_IN_PATH } from "constant/route";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signupRequest } from "redux/actions/authAction";
import { emailRegex, nameRegex, passwordRegex, phoneNumberRegex } from "utils";
import InputText from "../../../components/InputText/InputText";

function Signin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const signupError = useSelector((state) => state.auth.signupError);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const genderData = [
    {
      gender_id: 1,
      gender_name: "Nam",
    },
    {
      gender_id: 2,
      gender_name: "Nữ",
    },
  ];

  const sendSignupRequest = (data) => {
    dispatch(signupRequest(data));
  };

  return (
    <main className="main-content auth-main">
      <h1 className="logo">
        <i className="lab la-envira"></i>
        <span>Tây bắc</span>
      </h1>
      <div className="auth-content">
        <form
          className="form signup-form"
          onSubmit={handleSubmit(sendSignupRequest)}
        >
          <h2 className="auth-title">{t("signup")}</h2>
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
              validatePattern={passwordRegex}
            />
          </div>
          <div className="row-block">
            <InputText
              control={control}
              fieldName="name"
              error={errors.name}
              validatePattern={nameRegex}
            />
          </div>
          <div className="row-block">
            <InputSelect
              control={control}
              data={genderData}
              fieldName="gender"
              error={errors.gender}
            />
            <InputText
              control={control}
              fieldName="phoneNumber"
              error={errors.phoneNumber}
              validatePattern={phoneNumberRegex}
            />
          </div>
          <div className="row-block"></div>
          <div className="row-block">
            <InputText
              control={control}
              fieldName="address"
              error={errors.address}
            />
          </div>
          {signupError && (
            <span className="error-message error-message--mb">
              {t(signupError.message)}
            </span>
          )}
          <button className={"primary-btn"} type="submit" disabled={isLoading}>
            {isLoading ? <BtnLoading /> : t("signup")}
          </button>
          <p className="signin-text">
            <span>{t("you already have an account")}</span>
            <Link to={SIGN_IN_PATH}>{t("signin")}</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Signin;
