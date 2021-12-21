import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

function InputTextArea({ control, fieldName, isRequire = true, error, validatePattern }) {
    const { t } = useTranslation();
    return (
        <div className="input-block">
            <label htmlFor={fieldName}>{t(fieldName)}</label>
            <Controller
                name={fieldName}
                control={control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <textarea
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value || ""}
                        type="text"
                        id={fieldName}
                    />
                )}
                rules={{
                    required: {
                        value: isRequire,
                        message: "Trường trống",
                    },
                }}
            />
            <span className="error-message">{error?.type && error.message}</span>
        </div>
    );
}

export default InputTextArea;
