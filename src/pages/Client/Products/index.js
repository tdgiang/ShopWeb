import React, { useEffect, useState } from "react";
import "../scss/Products.scss";
import Sidebar from "./Sidebar";
import ProductsShow from "./ProductsShow";
import { dataShow } from "./dataFake";
function Products() {
  const [searchProduct, setSearchProduct] = useState("");
  const [dataNew] = useState(dataShow);
  const [data, setData] = useState([]);

  useEffect(() => {
    const changeData = dataNew.filter((val) =>
      val.productName.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setData(changeData);
  }, [searchProduct]);

  const handleOnCategoryChange = (categoryId) => {
    const newData = dataNew.filter((x) => x.categoryId == categoryId);
    setData(newData);
  };

  const handleOnRatingChange = (value) => {
    const newData = dataNew.filter((x) => x.rating == value);
    setData(newData);
  };

  const handleOnPriceRangeChange = (value) => {
    const newData = dataNew.filter(
      (x) => value.from <= x.price || value.to <= x.price
    );
    setData(newData);
  };

  function handleOnSortChange(e) {
    const filter =e.target.value;
    const data = [...dataNew]
    if(filter === "asc") {
      const newData = data.sort((a,b)=> a.price - b.price);
      setData(newData);
    }
    else if(filter === "desc") {
      const newData = data.sort((a, b) => b.price - a.price);
      setData(newData);
    }
    else {
      setData(data);
    }
    
  }

  return (
    <section className="products-container">
      <Sidebar
        data={data}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        handleOnCategoryChange={handleOnCategoryChange}
        handleOnRatingChange={handleOnRatingChange}
        handleOnPriceRangeChange={handleOnPriceRangeChange}
      ></Sidebar>
      <ProductsShow
        data={data}
        handleOnSortChange={handleOnSortChange}
      ></ProductsShow>
    </section>
  );
}

export default Products;
