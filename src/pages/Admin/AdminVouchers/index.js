import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { confirmModal, discountRegex, formatDate, formatMoney, numberRegex } from "utils";
import "../scss/AdminVouchers.scss";
import { Modal, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import InputText from "components/InputText/InputText";
import { DatePicker, Space } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import firebase, { db } from "firebase-config";
import BtnLoading from "components/Loading/BtnLoading";
import { toast } from "react-toastify";

const { Search } = Input;

function AdminVouchers() {
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vouchersData, setVouchersData] = useState([]);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({ mode: "onTouched" });
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const vouchersListener = db
            .collection("vouchers")
            .orderBy("createdDate", "asc")
            .onSnapshot((snapshot) => {
                const data = [];
                snapshot.forEach(function (doc) {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setVouchersData(data);
            });

        return vouchersListener;
    }, []);

    function handleOnSearchChange(e) {
        e.preventDefault();
    }

    function handleOnDelete(voucherId) {
        confirmModal(t("warning"), "Bạn có chắc chắn muốn xóa mã này không?", async () => {
            try {
                await db.collection("vouchers").doc(voucherId).delete();
                toast.success("Xóa mã giảm giá thành công");
            } catch (error) {
                toast.error("Xóa mã giảm giá không thành công");
            }
        });
    }

    async function handleOnAdd(value) {
        value.expireDate = new Date(value.expireDate.valueOf());
        value.use = 0;
        value.createdDate = firebase.firestore.FieldValue.serverTimestamp();
        try {
            setIsLoading(true);
            const response = await db.collection("vouchers").add(value);

            setIsLoading(false);
            setIsModalVisible(false);
            toast.success(t("add voucher success"));
            reset();
        } catch (error) {
            setIsLoading(false);
            setIsModalVisible(false);
            toast.error(t("add voucher fail"));
            reset();
        }
    }

    function handleOnCancel() {
        setIsModalVisible(false);
    }

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <h2 className="title">{t("vouchers manage")}</h2>
            </div>
            <div className="admin-section__content vouchers-section">
                <div className="content-filter">
                    <div className="search-filter">
                        {/* <Search
                            placeholder={t("search")}
                            onChange={handleOnSearchChange}
                            onSearch={handleOnSearch}
                            enterButton
                        /> */}
                        <p className="add-voucher-btn" onClick={() => setIsModalVisible(true)}>
                            <i class="bx bx-plus"></i>
                        </p>
                    </div>
                </div>
                <div className="vouchers-wrapper">
                    <ul className="vouchers-list">
                        {vouchersData.length <= 0 ? <p className="voucher-empty">Không tìm thấy mã giảm giá nào</p> :
                            vouchersData.map((item) => {
                                return (
                                    <li className="voucher-item">
                                        <div className="voucher-item-header">
                                            <i
                                                className="bx bx-x"
                                                onClick={() => handleOnDelete(item.id)}
                                            ></i>
                                        </div>
                                        <div className="voucher-content">
                                            <div className="voucher-content__left">
                                                <p className="voucher-title">{item.title}</p>
                                                <p className="voucher-code">{item.voucherCode}</p>
                                                <p className="voucher-max">
                                                    Tối đa: {formatMoney(item.max)}đ
                                                </p>
                                                <p className="expire-date">
                                                    Hạn sử dụng: {formatDate(item.expireDate.toMillis())}
                                                </p>
                                                <p className="quantity">
                                                    Còn lại: {item.quantity} lượt sử dụng
                                                </p>
                                            </div>
                                            <div className="voucher-content__right">
                                                <span className="voucher-discount">
                                                    {item.discount}%
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <Modal
                visible={isModalVisible}
                onOk={handleOnAdd}
                onCancel={handleOnCancel}
                footer={null}
            >
                <div className="voucher-add">
                    <p className="voucher-add__title">Thêm mã giảm giá</p>
                    <form className="voucher-form form" onSubmit={handleSubmit(handleOnAdd)}>
                        <div className="form-input">
                            <div>
                                <div className="row-block">
                                    <InputText
                                        control={control}
                                        fieldName="title"
                                        error={errors.title}
                                        // validatePattern={emailRegex}
                                    />
                                </div>
                                <div className="row-block">
                                    <InputText
                                        control={control}
                                        fieldName="voucherCode"
                                        error={errors.voucherCode}
                                        // validatePattern={nameRegex}
                                    />
                                </div>
                                <div className="row-block">
                                    <InputText
                                        control={control}
                                        fieldName="discount"
                                        error={errors.discount}
                                        validatePattern={discountRegex}
                                    />
                                    <InputText
                                        control={control}
                                        fieldName="max"
                                        error={errors.max}
                                        validatePattern={numberRegex}
                                    />
                                </div>
                                <div className="row-block">
                                    <InputText
                                        control={control}
                                        fieldName="quantity"
                                        error={errors.quantity}
                                        validatePattern={numberRegex}
                                    />
                                    <div className="input-block">
                                        <label htmlFor={"expireDate"}>{t("expireDate")}</label>
                                        <Controller
                                            name={"expireDate"}
                                            control={control}
                                            render={({
                                                field: { onChange, onBlur, value, name, ref },
                                            }) => (
                                                <DatePicker
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    locale={{
                                                        lang: {
                                                            locale: "vi_VN",
                                                        },
                                                    }}
                                                    allowClear={false}
                                                    bordered={false}
                                                    suffixIcon={null}
                                                    format={"DD/MM/YYYY"}
                                                />
                                            )}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Trường trống",
                                                },
                                            }}
                                        />
                                        {errors.expireDate && (
                                            <span className="error-message">
                                                {errors.expireDate.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="voucher-add-submit">
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? <BtnLoading /> : "Thêm mới"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
}

export default AdminVouchers;
