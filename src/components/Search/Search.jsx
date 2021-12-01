import React, { useEffect } from "react";
import { Input } from "antd";
import classes from "./Search.module.css";

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
      const newProducts = products?.filter((p) => p.name.includes(searchValue));
      return newProducts;
    });
  }, [products, searchValue, setProductsState]);

  return (
    <div className={classes.search_wrapper}>
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
