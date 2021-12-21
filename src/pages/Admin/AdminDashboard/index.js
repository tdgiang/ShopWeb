import React from "react";
import { useTranslation } from "react-i18next";

import { Column, Line } from "@ant-design/charts";
import "../scss/AdminDashboard.scss";
import ColumnChart from "./ColumnChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

function AdminDashboard() {
    const { t } = useTranslation();

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <h2 className="title">{t("dashboard")}</h2>
            </div>
            <div className="admin-section__content">
                <div className="dashboard-chart">
                    <div className="chart-block">
                        <h3 className="chart-title">Biểu đồ giới tính người dùng</h3>
                        <PieChart />
                    </div>
                    <div className="chart-block">
                        <h3 className="chart-title">Biểu đồ số tồn kho theo danh mục</h3>
                        <ColumnChart />
                    </div>
                    <div className="chart-block line-chart">
                        <h3 className="chart-title">Biểu đồ đánh giá sản phẩm</h3>
                        <LineChart />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminDashboard;
