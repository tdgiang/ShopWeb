import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../scss/Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    getProvinceRequest,
    getDistrictRequest,
    getWardRequest,
} from "redux/actions/addressAction";
import { useForm, Controller } from "react-hook-form";
import InputSelect from "components/InputSelect/InputSelect";
import InputText from "components/InputText/InputText";
import { nameRegex, emailRegex, phoneNumberRegex } from "utils/index";

import { formatMoney } from "utils";
import { Radio, Input, Space } from "antd";
import InputTextArea from "components/InputTextarea/InputTextarea";
import BtnLoading from "components/Loading/BtnLoading";
import { createOrderRequest } from "redux/actions/ordersAction";
import { db } from "firebase-config";
import { toast } from "react-toastify";

function Checkout() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onTouched" });
    const provinceData = useSelector((state) => state.address.province);
    const districtData = useSelector((state) => state.address.district);
    const wardData = useSelector((state) => state.address.ward);
    const isFetchingProvince = useSelector((state) => state.address.isFetchingProvince);
    const isFetchingDistrict = useSelector((state) => state.address.isFetchingDistrict);
    const isFetchingWard = useSelector((state) => state.address.isFetchingWard);
    const cart = useSelector((state) => state.cart);
    const isCreating = useSelector((state) => state.orders.isCreating);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [voucherInput, setVoucherInput] = useState("");
    const [voucherLoading, setVoucherLoading] = useState(false);
    const [voucherData, setVoucherData] = useState(null);

    useEffect(() => {
        dispatch(getProvinceRequest());
    }, [dispatch]);

    const onProvinceChange = (provinceId) => {
        dispatch(getDistrictRequest(provinceId));
        setValue("district", "");
        setValue("ward", "");
    };

    const onDistrictChange = (districtId) => {
        dispatch(getWardRequest(districtId));
        setValue("ward", "");
    };

    const onSubmit = (data) => {
        data.province = provinceData.find(
            (item) => item.province_id === data.province
        )?.province_name;
        data.district = districtData.find(
            (item) => item.district_id === data.district
        )?.district_name;
        data.ward = wardData.find((item) => item.ward_id === data.ward)?.ward_name;
        data.order = cart;
        data.note = data.note ? data.note : "";
        data.status = "unconfirm";
        data.userId = currentUser ? currentUser.id : "";
        data.tax = 10;
        data.shippingFee = 30000;
        if(voucherData) {
            data.voucher = voucherData
        }
        dispatch(createOrderRequest(data));
    };

    function handleOnVoucherChange(e) {
        setVoucherInput(e.target.value);
    }

    async function onVoucherSubmit() {
        console.log(voucherInput);
        try {
            const doc = await db
                .collection("vouchers")
                .where("voucherCode", "==", voucherInput)
                .get();
            let data;
            const now = new Date();
            doc.forEach((documentSnapshot) => {
                data = {
                    id: documentSnapshot.id,
                    ...documentSnapshot.data(),
                };
            });
            if (data.expireDate.toMillis() < now.getTime()) {
                toast.error("Mã giảm giá đã hết hạn sử dụng");
            } else if (data.quantity <= 0) {
                toast.error("Mã giảm giá đã hết lượt sử dụng");
            } else {
                setVoucherData(data);
                toast.success("Áp dụng mã giảm giá thành công");
            }
        } catch (error) {
            setVoucherData(null)
            toast.error("Mã giảm giá không tồn tại");
        }
    }

    const tempPrice = totalPrice;
    const taxPrice = (totalPrice * 10) / 100;
    const shipPrice = 30000;
    let discountPrice = voucherData ? ((tempPrice + taxPrice + shipPrice) * Number(voucherData.discount) / 100) : 0
    if(discountPrice > voucherData?.max) {
        discountPrice = voucherData?.max
    }
    const billPrice = tempPrice + taxPrice + shipPrice - discountPrice

    return (
        <section className="checkout">
            <h2 className="checkout__title">{t("checkout")}</h2>
            <form
                action="#"
                className="form checkout-main checkout-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="checkout-main__left">
                    <h3 className="block-title">{t("personal info")}</h3>
                    <div className="row-block">
                        <InputText
                            control={control}
                            fieldName="name"
                            error={errors.name}
                            validatePattern={nameRegex}
                        />
                    </div>
                    <div className="row-block">
                        <InputText
                            control={control}
                            fieldName="email"
                            error={errors.email}
                            validatePattern={emailRegex}
                        />
                        <InputText
                            control={control}
                            fieldName="phoneNumber"
                            error={errors.phoneNumber}
                            validatePattern={phoneNumberRegex}
                        />
                    </div>
                    <h3 className="block-title child-title">{t("delivery address")}</h3>
                    <div className="row-block row-block--half">
                        <InputSelect
                            control={control}
                            fieldName="province"
                            data={provinceData}
                            isFetching={isFetchingProvince}
                            onChangeField={onProvinceChange}
                            error={errors.province}
                        />
                    </div>
                    <div className="row-block row-block--half">
                        <InputSelect
                            control={control}
                            fieldName="district"
                            data={districtData}
                            isFetching={isFetchingDistrict}
                            onChangeField={onDistrictChange}
                            error={errors.district}
                        />
                    </div>
                    <div className="row-block row-block--half">
                        <InputSelect
                            control={control}
                            fieldName="ward"
                            data={wardData}
                            isFetching={isFetchingWard}
                            error={errors.ward}
                        />
                    </div>
                    <div className="row-block">
                        <InputText control={control} fieldName="address" error={errors.address} />
                    </div>
                    <div className="row-block">
                        <InputTextArea
                            control={control}
                            fieldName="note"
                            error={errors.note}
                            isRequire={false}
                        />
                    </div>
                    <h3 className="block-title child-title">{t("payment method")}</h3>
                    <div className="row-block row-block--checkbox">
                        <Controller
                            name={"paymentMethod"}
                            control={control}
                            render={({ field: { onChange, onBlur, value, name, ref } }) => (
                                <Radio.Group
                                    onChange={onChange}
                                    value={value}
                                    defaultValue="payment on delivery"
                                >
                                    <Space direction="vertical">
                                        <Radio value="payment on delivery" defaultChecked>
                                            {t("payment on delivery")}
                                        </Radio>
                                        <Radio value="payment via card" disabled>
                                            {t("payment via card")}
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            )}
                            rules={{
                                required: {
                                    value: true,
                                    message: "Trường trống",
                                },
                            }}
                            defaultValue="payment on delivery"
                        />
                    </div>
                </div>
                <div className="checkout-main__right">
                    <h3 className="block-title">{t("bill info")}</h3>
                    <div className="price-row">
                        <span className="price-title">{t("sub total price")}</span>
                        <span className="price-number">{formatMoney(tempPrice)} đ</span>
                    </div>
                    <div className="price-row">
                        <span className="price-title">{t("tax")}</span>
                        <span className="price-number">
                            {formatMoney(taxPrice)} đ
                        </span>
                    </div>
                    <div className="price-row">
                        <span className="price-title">{t("shipping fee")}</span>
                        <span className="price-number">{formatMoney(shipPrice)} đ</span>
                    </div>
                    <div className="voucher">
                        <p className="voucher-title-text">Mã giảm giá</p>
                        <div className="voucher-form-checkout">
                            <input
                                type="text"
                                value={voucherInput}
                                onChange={handleOnVoucherChange}
                            />
                            <button className="voucher-btn" type="button" onClick={onVoucherSubmit}>
                                Áp dụng
                            </button>
                        </div>
                        <div className="price-row voucher-row">
                            <span className="price-title">Ưu đãi</span>
                            <span className="price-number">
                                {formatMoney(discountPrice)} đ
                            </span>
                        </div>
                    </div>
                    <div className="price-row price-row--total">
                        <span className="price-title">{t("total price")}</span>
                        <span className="price-number">
                            {formatMoney(billPrice)} đ
                        </span>
                    </div>
                    <button className="order-button" type="submit">
                        {isCreating ? <BtnLoading /> : t("order")}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Checkout;
