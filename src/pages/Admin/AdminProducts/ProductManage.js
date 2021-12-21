import { ADD_PATH } from "constant/route";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import InputText from "components/InputText/InputText";
import InputTextArea from "components/InputTextarea/InputTextarea";
import InputSelect from "components/InputSelect/InputSelect";
import { discountRegex, nameRegex, numberRegex } from "utils";
import { useDispatch, useSelector } from "react-redux";
import BtnLoading from "components/Loading/BtnLoading";
import {
    createProductRequest,
    getOneProductRequest,
    updateProductRequest,
} from "redux/actions/productsAction";

function ProductManage() {
    const { t } = useTranslation();
    const { productId } = useParams();
    const categoriesData = useSelector((state) => state.categories.data);
    const isCreating = useSelector((state) => state.products.isCreating);
    const isUpdating = useSelector((state) => state.products.isUpdating);
    const currentProduct = useSelector((state) => state.products.currentProduct);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAddProduct = productId === ADD_PATH.replace("/", "");
    const [productImage, setProductImage] = useState(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onTouched" });

    useEffect(() => {
        if (!isAddProduct) {
            dispatch(getOneProductRequest(productId));
        }
    }, [dispatch, isAddProduct, productId]);

    useEffect(() => {
        if (!isAddProduct && currentProduct) {
            reset(currentProduct);
            setProductImage(currentProduct.productImage);
        }
    }, [isAddProduct, currentProduct, reset]);

    const productUnits = [
        {
            unit_id: "Sản phẩm",
            unit_name: "Sản phẩm",
        },
        {
            unit_id: "g",
            unit_name: "g",
        },
        {
            unit_id: "kg",
            unit_name: "kg",
        },
        {
            unit_id: "Củ",
            unit_name: "Củ",
        },
        {
            unit_id: "Quả",
            unit_name: "Quả",
        },
    ];

    const onSubmit = (data) => {
        data.productImage = productImage.file;
        data.quantity = parseFloat(data.quantity);
        data.price = parseFloat(data.price);
        data.discount = parseFloat(data.discount);
        if (isAddProduct) {
            dispatch(createProductRequest(data));
        } else {
            data.id = productId;
            data.productImage = typeof productImage === "object" ? productImage.file : productImage;
            dispatch(updateProductRequest(data));
        }
    };

    const goBack = () => {
        history.goBack();
    };

    const handleOnImageChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        reader.onloadend = () => {
            setProductImage({
                file: file,
                url: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <i class="bx bx-arrow-back" onClick={goBack}></i>
                <h2 className="title">{t(isAddProduct ? "add product" : "edit product")}</h2>
            </div>
            <div className="admin-section__content">
                <form className="product-manage form form--sm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="product-manage__left">
                        <h3 className="manage-title">{t("product info")}</h3>
                        <div className="row-block">
                            <InputText
                                control={control}
                                fieldName="productName"
                                error={errors.productName}
                                validatePattern={nameRegex}
                            />
                        </div>
                        <div className="row-block">
                            {categoriesData && (
                                <InputSelect
                                    control={control}
                                    fieldName="categoryId"
                                    data={categoriesData}
                                    error={errors.categoryId}
                                    special={true}
                                />
                            )}
                        </div>
                        <div className="row-block">
                            <InputText
                                control={control}
                                fieldName="price"
                                error={errors.price}
                                validatePattern={numberRegex}
                            />
                            <InputText
                                control={control}
                                fieldName="quantity"
                                error={errors.quantity}
                                validatePattern={numberRegex}
                            />
                            <InputSelect
                                control={control}
                                fieldName="unit"
                                data={productUnits}
                                error={errors.unit}
                            />
                            <InputText
                                control={control}
                                fieldName="discount"
                                error={errors.discount}
                                validatePattern={discountRegex}
                            />
                        </div>
                        <div className="row-block">
                            <InputTextArea
                                control={control}
                                fieldName="description"
                                error={errors.description}
                            />
                        </div>
                        <div className="submit-wrapper">
                            <div className="submit-button">
                                <button
                                    class="btn"
                                    type="submit"
                                    disabled={isAddProduct ? isCreating : isUpdating}
                                >
                                    {(isAddProduct ? isCreating : isUpdating) ? (
                                        <BtnLoading />
                                    ) : (
                                        t(isAddProduct ? "add product" : "edit product")
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-manage__right">
                        <h3 className="manage-title">{t("product image")}</h3>
                        <div className="image-preview">
                            <img
                                src={
                                    productImage?.url ||
                                    productImage ||
                                    "https://bolgatangabaskets.com/wp-content/uploads/2019/05/placeholder-image.png"
                                }
                                alt="product"
                            />
                        </div>
                        <Controller
                            name={"productImage"}
                            control={control}
                            render={({ field: { onChange, onBlur, value, name, ref } }) => (
                                <input
                                    type="file"
                                    name="productImage"
                                    id="input-upload"
                                    onChange={(e) => {
                                        onChange(e);
                                        handleOnImageChange(e);
                                    }}
                                />
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường trống",
                                },
                            }}
                        />
                        {errors.productImage && (
                            <span className="error-message">{errors.productImage.message}</span>
                        )}
                        <div className="image-upload">
                            <label htmlFor="input-upload" className="btn">
                                {t("upload image")}
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ProductManage;
