import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Slider from "react-slick";
import { addCart } from "redux/actions/cartAction";
import { getOneProductRequest, sendCommentRequest } from "redux/actions/productsAction";
import { commentRegex, confirmModal, formatMoney, phoneNumberRegex } from "utils";
import Loading from "../components/Loading";
import ProductItem from "../components/ProductItem";
import QuantityInput from "../components/QuantityInput";
import "../scss/ProductDetail.scss";
import Stars from "./../components/Stars";
import { useForm, Controller } from "react-hook-form";
import { db } from "firebase-config";
import { CART_PATH } from "constant/route";
import BtnLoading from "components/Loading/BtnLoading";
import { dataShow } from "pages/Client/Products/dataFake";

function ProductDetail() {
  const [product, setProduct] = useState();
  const idData = localStorage.getItem("getData");
  useEffect(() => {
    const findIdData = dataShow.find((x) => x.id === JSON.parse(idData));
    setProduct(findIdData);
  }, [idData])
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isFetchingCurrentProduct = useSelector(
        (state) => state.products.isFetchingCurrentProduct
    );
    const [quantityValue, setQuantityValue] = useState(1);
    const { productId } = useParams();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onTouched" });
    const [productComments, setProductComments] = useState([]);
    const isCommenting = useSelector((state) => state.products.isCommenting);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        dispatch(getOneProductRequest(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        const commentListener = db
            .collection("comments")
            .where("productId", "==", productId)
            .orderBy("createdDate", "asc")
            .onSnapshot((snapshot) => {
                const data = [];
                snapshot.forEach(function (doc) {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setProductComments(data);
            });

        return commentListener;
    }, [productId]);

    useEffect(() => {
        if (!product) {
            return;
        }

        const relatedProductsListener = db
            .collection("products")
            .where("categoryId", "==", product.categoryId)
            .orderBy("createdDate", "asc")
            .onSnapshot((snapshot) => {
                const data = [];
                snapshot.forEach(function (doc) {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setRelatedProducts(data);
            });

        return relatedProductsListener;
    }, [product]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(addCart(product, quantityValue));
        history.push(CART_PATH);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth <= 768 ? 2 : 4,
        slidesToScroll: 1,
    };

    if (isFetchingCurrentProduct) {
        return <Loading />;
    }

    if (!product) {
        return null;
    }

    const handleOnCommentSubmit = ({ comment, rating }) => {
        const commentData = {
            productId,
            user: {
                id: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar,
            },
            comment,
            rating,
        };
        dispatch(sendCommentRequest(commentData));
        reset({
            comment: "",
            rating: 0,
        });
    };

    
    return (
      <section className="product-detail">
        <div className="product-info">
          <div className="product-info__top">
            <div className="top-left">
              <img src={product?.productImage} alt={product?.productName} />
            </div>
            <div className="top-right">
              <p className="product-title">{product?.productName}</p>
              <Stars starsNumber={product?.rating}></Stars>
              <p className="product-description">{product?.description}</p>
              <div className="product-price">
                <span className="main-price">
                  {formatMoney(product?.price) + " đ"}
                </span>
                <span className="unit"> / {product?.unit}</span>
              </div>
              <form
                action="#"
                className="product-quantity"
                onSubmit={(e) => handleOnSubmit(e)}
              >
                <div className="form-top">
                  <QuantityInput
                    quantity={quantityValue}
                    onChangeQuantity={setQuantityValue}
                  ></QuantityInput>{" "}
                </div>
                <div className="form-bottom">
                  <button type="submit">{t("buy now")}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="product-article">
          <p className="article__top">{t("article main")}</p>
          <div className="article__bottom">
            <span>{t("article 1")}</span>
            <span>{t("article 2")}</span>
            <span>{t("article 3")}</span>
          </div>
        </div>
        <div className="product-comments">
          <p className="block-title">{t("comments")}</p>
          <ul className="comments-list">
            {productComments.length > 0 ? (
              productComments.map(
                (
                  { id, user: { name, avatar }, comment, rating, createdAt },
                  index
                ) => {
                  return (
                    <li className="comment-item" key={id}>
                      <div className="comment-item__left">
                        <img src={avatar} alt={name + "avatar"} />
                      </div>
                      <div className="comment-item__right">
                        <div className="user-name">{name}</div>
                        <Stars starsNumber={rating}></Stars>
                        <div className="user-comment">{comment}</div>
                        <span className="created-date">{createdAt}</span>
                      </div>
                    </li>
                  );
                }
              )
            ) : (
              <p className="empty-comment">{t("empty comment")}</p>
            )}
          </ul>
          <div className="user-rating">
            {!currentUser ? (
              <p className="require-signin">{t("require signin")}</p>
            ) : (
              <div className="comment-item">
                <div className="comment-item__left">
                  <img src={currentUser.avatar} alt="avatar" />
                </div>
                <div className="comment-item__right">
                  <div className="user-name">
                    {currentUser ? currentUser.name : t("anonymous user")}
                  </div>
                  <form
                    action="#"
                    className="user-comment-form"
                    onSubmit={handleSubmit(handleOnCommentSubmit)}
                  >
                    <Controller
                      name={"rating"}
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
                        <Rate
                          allowClear={false}
                          defaultValue={0}
                          value={value}
                          onChange={onChange}
                          style={{ color: "#ffb524", fontSize: "20px" }}
                        />
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Trường trống",
                        },
                      }}
                    />
                    {errors.rating && (
                      <p className="rating-error">{t("rating error")}</p>
                    )}
                    <Controller
                      name={"comment"}
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                      }) => (
                        <textarea
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                        ></textarea>
                      )}
                      rules={{
                        required: {
                          value: true,
                          message: "Trường trống",
                        },
                        pattern: {
                          value: commentRegex,
                          message: t(`comment error`),
                        },
                      }}
                    />
                    <p className="comment-error">
                      {errors.comment && errors.comment.message}
                    </p>
                    <button type="submit">
                      {isCommenting ? <BtnLoading /> : t("comments")}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="products-relate">
          <p className="block-title">{t("relate title")}</p>
          <Slider {...settings}>
            {dataShow.map((item, index) => (
              <div className="slide-item" key={index}>
                <ProductItem item={item}></ProductItem>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
}

export default ProductDetail;
