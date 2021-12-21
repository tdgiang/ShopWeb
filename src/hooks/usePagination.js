import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dataShow } from "../pages/Client/Products/dataFake";

function usePagination(init, initPageSize) {
  const [data] = useState(dataShow);
  const [currentData, setCurrentData] = useState([]);
  const [paginationParam, setPaginationParam] = useState({
    page: 1,
    pageSize: initPageSize,
  });
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const { page, pageSize } = paginationParam;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    if (totalData.length > 0) {
      setCurrentData(data?.slice(start, end));
    } else {
      setCurrentData(data?.slice(start, end));
    }
  }, [paginationParam, data, totalData]);

  return {
    currentData,
    currentPage: paginationParam.page,
    totalPage: totalData.length > 0 ? totalData.length : data.length,
    setPaginationParam,
    setCurrentData,
    pageSize: paginationParam.pageSize,
    setTotalData,
  };
}

export default usePagination;
