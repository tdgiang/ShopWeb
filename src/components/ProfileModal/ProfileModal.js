import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_PROFILE_MODAL } from "redux/actions/modalAction";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import "./ProfileModal.scss";
import InputText from "components/InputText/InputText";
import { emailRegex, nameRegex, phoneNumberRegex } from "utils";
import InputSelect from "components/InputSelect/InputSelect";
import { updateUserRequest } from "redux/actions/usersAction";
import BtnLoading from "components/Loading/BtnLoading";

function ProfileModal() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isVisible = useSelector((state) => state.modals.profileModal);
    const isUpdating = useSelector((state) => state.users.isUpdating);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({ mode: "onTouched" });
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        reset(currentUser);
        setAvatar(currentUser?.avatar);
    }, [currentUser, reset]);

    const handleOk = () => {
        dispatch({ type: HIDE_PROFILE_MODAL });
    };

    const handleCancel = () => {
        dispatch({ type: HIDE_PROFILE_MODAL });
    };

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

    const onSubmit = (data) => {
        data.avatar = avatar.file;
        data.avatar = typeof avatar === "object" ? avatar.file : avatar;
        dispatch(updateUserRequest(data));
    };

    const handleOnImageChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        reader.onloadend = () => {
            setAvatar({
                file: file,
                url: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    return (
        <Modal
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={null}
        >
            <h4 className="modal-title">{t("user profile")}</h4>
            <form className="user-profile-form form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-input">
                    <div className="form-input__left">
                        <div className="row-block">
                            <InputText
                                control={control}
                                fieldName="email"
                                error={errors.email}
                                validatePattern={emailRegex}
                                disabled
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
                        <div className="row-block">
                            <InputText
                                control={control}
                                fieldName="address"
                                error={errors.address}
                            />
                        </div>
                    </div>
                    <div className="form-input__right">
                        <h3 className="manage-title">{t("avatar image")}</h3>
                        <div className="image-preview">
                            <img
                                src={
                                    avatar?.url ||
                                    avatar ||
                                    "https://bolgatangabaskets.com/wp-content/uploads/2019/05/placeholder-image.png"
                                }
                                alt="avtar"
                            />
                        </div>
                        <Controller
                            name={"avatar"}
                            control={control}
                            render={({ field: { onChange, onBlur, value, name, ref } }) => (
                                <input
                                    type="file"
                                    name="avatar"
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
                        {errors.avatar && (
                            <span className="error-message">{errors.avatar.message}</span>
                        )}
                        <div className="image-upload">
                            <label htmlFor="input-upload" className="btn">
                                {t("upload image")}
                            </label>
                        </div>
                    </div>
                </div>
                <button className="form-button">
                    {isUpdating ? <BtnLoading /> : t("update profile")}
                </button>
            </form>
        </Modal>
    );
}

export default ProfileModal;
