import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersRequest, getAllUsersSuccess, updateUserFieldRequest } from "redux/actions/usersAction";
import { Table, Tag, Space, Button, Pagination } from "antd";
import "../scss/AdminUsers.scss";
import { db } from "firebase-config";
import { confirmModal } from "utils";
import usePagination from "hooks/usePagination";

function AdminUsers() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { currentData, totalPage, pageSize, setPaginationParam, currentPage } = usePagination(
        "users",
        10
    );

    useEffect(() => {
        const usersListener = db
            .collection("users")
            .orderBy("createdDate", "asc")
            .onSnapshot((snapshot) => {
                const data = [];
                snapshot.forEach(function (doc) {
                    data.push({ id: doc.id, ...doc.data() });
                });
                dispatch(getAllUsersSuccess(data))
            });
        return usersListener;
    }, []);

    function handleOnChangePage(page, pageSize) {
        setPaginationParam({ page, pageSize });
    }

    const upRoleUser = (record) => {
        const userData = {
            ...record,
            field: "role",
            value: "admin",
            message: {
                success: t("up role success"),
                fail: t("up role fail"),
            },
        };

        confirmModal(
            t("warning"),
            t("up role user confirm"),
            () => {
                dispatch(updateUserFieldRequest(userData));
            },
            t("up role")
        );
    };

    const toggleLockUser = (record) => {
        const isLocked = record?.status === "locked";

        const userData = {
            ...record,
            field: "status",
            value: isLocked ? "active" : "locked",
            message: {
                success: isLocked ? t("unlock user success") : t("lock user success"),
                fail: isLocked ? t("unlock user fail") : t("lock user fail"),
            },
        };

        confirmModal(
            t("warning"),
            t(`${isLocked ? "unlock user confirm" : "lock user confirm"}`),
            () => {
                dispatch(updateUserFieldRequest(userData));
            },
            isLocked ? t("do unlock") : t("do lock")
        );
    };

    const columns = [
        {
            title: t("user name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("email"),
            dataIndex: "email",
            key: "email",
        },
        {
            title: t("phoneNumber"),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: t("gender"),
            dataIndex: "gender",
            key: "gender",
            render: (gender) => <span>{gender === 1 ? t("male") : t("female")}</span>,
        },
        {
            title: t("address"),
            dataIndex: "address",
            key: "address",
        },
        {
            title: t("role"),
            key: "role",
            dataIndex: "role",
            render: (role, record) => (
                <>
                    <Tag key={role} color={role === "admin" ? "geekblue" : "green"}>
                        {role.toUpperCase()}
                    </Tag>
                    {record?.status === "locked" && (
                        <Tag key={record.status} color="volcano">
                            {t(record.status).toUpperCase()}
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: t("action"),
            key: "action",
            render: (text, record) => {
                if (record.role === "admin") {
                    return null;
                }
                return (
                    <div className="action-button">
                        <i
                            class="bx bxs-upvote up-role"
                            onClick={() => {
                                upRoleUser(record);
                            }}
                        ></i>
                        <i
                            class={`bx ${
                                record?.status === "locked" ? "bxs-lock-open-alt" : "bxs-lock-alt"
                            } lock-user`}
                            onClick={() => {
                                toggleLockUser(record);
                            }}
                        ></i>
                    </div>
                );
            },
        },
    ];

    return (
        <section className="admin-section">
            <div className="admin-section__header">
                <h2 className="title">{t("users manage")}</h2>
            </div>
            <div className="admin-section__content user-section">
                <div className="users-table">
                    <Table columns={columns} dataSource={currentData} pagination={false} />
                </div>
                {currentData.length > 0 && (
                    <div className="table-pagination">
                        <Pagination
                            current={currentPage}
                            total={totalPage}
                            pageSize={pageSize}
                            onChange={handleOnChangePage}
                            pageSizeOptions={[5, 10, 15, 20]}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminUsers;
