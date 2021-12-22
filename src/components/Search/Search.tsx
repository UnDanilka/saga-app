import React, { useEffect, useState } from "react";
import { Input } from "antd";
import classes from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { ISearch } from "../../Interfaces";

const Search = ({ products, setProductsState, searchValue }: ISearch) => {
  const { Search } = Input;
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSearch = (props: string) => {
    navigate(`filter/${props}`);
  };

  useEffect(() => {
    setProductsState(() => {
      const newProducts = products?.filter((p) => p.name.includes(searchValue));
      return newProducts;
    });
    setInputValue(searchValue);
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
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
