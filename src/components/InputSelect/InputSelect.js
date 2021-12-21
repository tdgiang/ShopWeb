import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const { Option } = Select;

function InputSelect({
    control,
    fieldName,
    data,
    isFetching,
    onChangeField,
    error,
    isRequire = true,
    special = false,
}) {
    const { t } = useTranslation();
    return (
        <div className="input-block">
            <label htmlFor={fieldName}>{t(fieldName)}</label>
            <div
                className="select-wrapper"
                style={{
                    backgroundColor: !(data.length > 0) && "#ddd",
                }}
            >
                <Controller
                    name={fieldName}
                    control={control}
                    rules={{
                        required: {
                            value: isRequire,
                            message: "Trường trống",
                        },
                    }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            disabled={!(data.length > 0)}
                            showSearch
                            style={{
                                width: "100%",
                            }}
                            optionFilterProp="children"
                            onChange={(value) => {
                                onChangeField && onChangeField(value);
                                field.onChange(value);
                            }}
                            loading={isFetching}
                        >
                            {data.map((item, index) => {
                                if (!special) {
                                    return (
                                        <Option
                                            value={item[`${fieldName}_id`]}
                                            key={item[`${fieldName}_id`]}
                                        >
                                            {item[`${fieldName}_name`]}
                                        </Option>
                                    );
                                }
                                return (
                                    <Option value={item.id} key={index}>
                                        {item.title}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                />
            </div>
            <span className="error-message">{error?.type && error.message}</span>
        </div>
    );
}

export default InputSelect;
