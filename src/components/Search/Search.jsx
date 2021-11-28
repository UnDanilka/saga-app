import React, { useEffect } from "react";
import { Input } from "antd";

const Search = ({
  products,
  setProductsState,
  searchValue,
  setSearchValue,
}) => {
  const { Search } = Input;

  const onSearch = (props) => {
    setSearchValue(props);
  };

  useEffect(() => {
    setProductsState(() => {
      const newProducts = products.filter((p) => p.name.includes(searchValue));
      return newProducts;
    });
  }, [products, searchValue, setProductsState]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Search
        style={{ width: 300 }}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={onSearch}
      />
    </div>
  );
};

export default Search;
