import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./../scss/AdminHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signoutRequest } from "redux/actions/authAction";
import { Popover } from "antd";
import { PROFILE_PATH } from "constant/route";
import { SHOW_PROFILE_MODAL } from "redux/actions/modalAction";
import i18n from "i18n";

function AdminHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  function signout() {
    dispatch(signoutRequest());
  }

  function showModal(e) {
    e.preventDefault();
    setPopupVisible(false);
    dispatch({ type: SHOW_PROFILE_MODAL });
  }

  function userPopup() {
    return (
      <div className="popup-content">
        <a href="profile" onClick={showModal}>
          {t("profile")}
        </a>
        <button
          type="button"
          className="signout-btn primary-btn"
          onClick={signout}
        >
          {t("signout")}
        </button>
      </div>
    );
  }

  function languagePopup() {
    return (
      <div className="popup-content">
        <span className="language-list" onClick={() => changeLanguage("vi")}>
          Tiếng Việt
        </span>
        <span className="language-list" onClick={() => changeLanguage("en")}>
          English
        </span>
      </div>
    );
  }

  function changeLanguage(lng) {
    i18n.changeLanguage(lng);
  }

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <div className="logo">
          <i className="lab fa-book"></i>
          <span>Tây bắc</span>
          <small>admin</small>
        </div>
      </div>
      <div className="admin-header__right">
        <Popover placement="bottom" content={languagePopup()} trigger="click">
          <div className="language">
            <div className="languague-title">
              <i className="las la-globe"></i>
              <span>{t("language")}</span>
            </div>
          </div>
        </Popover>
        <Popover
          placement="bottom"
          content={userPopup()}
          trigger="click"
          visible={popupVisible}
          onVisibleChange={setPopupVisible}
        >
          <div className="user">
            <span className="user-name">{currentUser.name}</span>
            <div className="user-avatar">
              <img
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : "https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image.png"
                }
                alt={currentUser.name}
              />
            </div>
          </div>
        </Popover>
      </div>
    </header>
  );
}

export default AdminHeader;
