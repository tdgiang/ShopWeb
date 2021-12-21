import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../scss/Footer.scss";

function Footer() {
  const { t } = useTranslation();

  const pagesData = [
    { title: "home", url: "/" },
    { title: "products", url: "/products" },
    { title: "blogs", url: "/blogs" },
    { title: "contact", url: "/contact" },
  ];

  const policiesData = [
    { title: "term", url: "/" },
    { title: "policy", url: "/" },
    { title: "accessibility", url: "/" },
    { title: "privacy", url: "/" },
  ];

  const socialNetworkData = [
    { title: "twitter", icon: "bx bxl-twitter", url: "/" },
    { title: "facebook", icon: "bx bxl-facebook-square", url: "/" },
    { title: "skype", icon: "bx bxl-skype", url: "/" },
    { title: "instagram", icon: "bx bxl-instagram", url: "/" },
  ];
  return (
    <footer className="footer-container">
      <div className="footer main-content">
        <div className="footer__top">
          <div className="footer-intro">
            <div className="intro-logo logo">
              <Link to="/">
                <i className="lab la-envira"></i>
                <span>Tây bắc</span>
              </Link>
            </div>
            <p className="intro-description">{t("footer description")}</p>
            <ul className="social-network">
              {socialNetworkData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>
                      <i className={item.icon}></i>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-block">
            <span className="block-title">{t("pages")}</span>
            <ul className="footer-list">
              {policiesData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{t(item.title)}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-block">
            <span className="block-title">{t("policies")}</span>
            <ul className="footer-list">
              {pagesData.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{t(item.title)}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-block">
            <span className="block-title">{t("our info")}</span>
            <div className="footer-info">
              <p>+ 84 978 434 621</p>
              <p>acha102@gmail.com</p>
              <p>Long Bien, Ha Noi</p>
            </div>
          </div>
        </div>
        <div className="footer__bottom"></div>
      </div>
    </footer>
  );
}

export default Footer;
