import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Line } from "@ant-design/charts";
import { getProductsRequest } from "redux/actions/productsAction";

function LineChart() {
    const productsData = useSelector((state) => state.products.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsRequest());
    }, []);

    const rating = [1, 2, 3, 4, 5]

    const data = rating.map(item => {
        return {
            rating: item,
            amount: productsData.filter(product => product.rating === item).length
        }
    })
    
    const config = {
        data,
        xField: "amount",
        yField: "rating",
        point: {
            size: 5,
            shape: "diamond",
        },
    };
    return <Line {...config} />;
}

export default LineChart;
