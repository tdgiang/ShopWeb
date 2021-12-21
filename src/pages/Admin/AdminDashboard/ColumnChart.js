import React, { useEffect } from "react";
import { Column } from "@ant-design/charts";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRequest } from "redux/actions/productsAction";
import { getCategoriesRequest } from "redux/actions/categoriesAction";

const ColumnChart = () => {
    const productsData = useSelector((state) => state.products.data);
    const categoriesData = useSelector((state) => state.categories.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsRequest());
        dispatch(getCategoriesRequest());
    }, []);

    const data = categoriesData.map(category=>{
        return {
            type: category.title,
            value: productsData.filter(product => product.categoryId === category.id).length
        }
    })

    var config = {
        data: data,
        xField: "type",
        yField: "value",
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: "Danh mục" },
            value: { alias: "Tồn kho" },
        },
    };
    return <Column {...config} />;
};

export default ColumnChart;
