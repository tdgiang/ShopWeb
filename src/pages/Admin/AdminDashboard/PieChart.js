import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pie } from "@ant-design/charts";
import { getAllUsersRequest } from "redux/actions/usersAction";

const PieChart = () => {
    const usersData = useSelector((state) => state.users.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersRequest());
    }, []);

    var data = [
        {
            type: "Nam",
            value: usersData.filter((item) => item.gender === 1).length,
        },
        {
            type: "Nữ",
            value: usersData.filter((item) => item.gender === 2).length,
        },
    ];
    var config = {
        appendPadding: 10,
        data: data,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
            type: "inner",
            offset: "-30%",
            content: function content(_ref) {
                var percent = _ref.percent;
                return "".concat((percent * 100).toFixed(0), "%");
            },
            style: {
                fontSize: 14,
                textAlign: "center",
            },
        },
        interactions: [{ type: "element-active" }],
    };
    return <Pie {...config} />;
};

export default PieChart;
