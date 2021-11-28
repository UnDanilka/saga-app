import { useEffect, useState } from "react";
import classes from "./Table.module.css";
import Product from "../Product/Product";
import Search from "../Search/Search";
import Header from "../Header/Header";

const Table = (props) => {
  const { products } = props.data;
  const [productsState, setProductsState] = useState(products);
  const [sorting, setSorting] = useState({ name: null, price: null });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setProductsState(products.filter((p) => p.name.includes(searchValue)));
  }, [products]);

  useEffect(() => {
    console.log("productsState", productsState);
  }, [productsState]);

  const setSortedValue = (exp) => {
    setProductsState((prev) => {
      const currProducts = [...prev];
      // eslint-disable-next-line no-eval
      currProducts.sort((a, b) => eval(exp));
      return currProducts;
    });
  };

  useEffect(() => {
    if (sorting.name) {
      if (sorting.name === "asc") {
        setSortedValue("a.name.localeCompare(b.name)");
      } else {
        setSortedValue("b.name.localeCompare(a.name)");
      }
      return;
    }
    if (sorting.price) {
      if (sorting.price === "asc") {
        setSortedValue("a.price - b.price");
      } else {
        setSortedValue("b.price - a.price");
      }
      return;
    }
    setProductsState(() => {
      return products.filter((p) => p.name.includes(searchValue));
    });
  }, [products, searchValue, sorting]);

  return (
    <div style={{ overflow: "auto" }}>
      <div className={classes.main_table}>
        <Search
          products={products}
          setProductsState={setProductsState}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Header sorting={sorting} setSorting={setSorting} />
        {productsState.map((product, index) => {
          return <Product product={product} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Table;
