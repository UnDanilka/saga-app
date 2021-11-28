import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import classes from "./Table.module.css";
import Product from "../Product/Product";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const Table = (props) => {
  const { products } = props.data;
  const [productsState, setProductsState] = useState(products);
  const [sorting, setSorting] = useState({ name: null, price: null });

  useEffect(() => {
    setProductsState(products);
  }, [products]);

  const getSortingIcon = (col) => {
    if (sorting[col]) {
      if (sorting[col] === "asc") {
        return (
          <div className={classes.sortIcon}>
            <CaretUpOutlined />
          </div>
        );
      } else {
        return (
          <div className={classes.sortIcon}>
            <CaretDownOutlined />
          </div>
        );
      }
    } else {
      return "";
    }
  };

  const handleSorting = (col) => {
    const initSort = { name: null, price: null };

    setSorting((prev) => {
      if (prev[col]) {
        if (prev[col] === "asc") {
          return { ...initSort, [col]: "desc" };
        } else {
          return { ...initSort, [col]: null };
        }
      } else {
        return { ...initSort, [col]: "asc" };
      }
    });
  };

  useEffect(() => {
    console.log(productsState);
  }, [productsState]);

  useEffect(() => {
    if (sorting.name) {
      if (sorting.name === "asc") {
        setProductsState((prev) => {
          const currProducts = [...prev];
          currProducts.sort((a, b) => a.name.localeCompare(b.name));
          return currProducts;
        });
      } else {
        setProductsState((prev) => {
          const currProducts = [...prev];
          currProducts.sort((a, b) => b.name.localeCompare(a.name));
          return currProducts;
        });
      }
      return;
    }
    if (sorting.price) {
      if (sorting.price === "asc") {
        setProductsState((prev) => {
          const currProducts = [...prev];
          currProducts.sort((a, b) => a.price - b.price);
          return currProducts;
        });
      } else {
        setProductsState((prev) => {
          const currProducts = [...prev];
          currProducts.sort((a, b) => b.price - a.price);
          return currProducts;
        });
      }
      return;
    }
    setProductsState(products);
  }, [products, sorting]);

  return (
    <div className={classes.main_table}>
      <Row className={classes.header}>
        <Col span={12}>
          <div
            className={classes.header_item}
            onClick={() => handleSorting("name")}
          >
            Name
            {getSortingIcon("name")}
          </div>
        </Col>
        <Col span={5}>
          <div
            className={classes.header_item}
            onClick={() => handleSorting("price")}
          >
            Price {getSortingIcon("price")}
          </div>
        </Col>
        <Col span={7}>
          <div className={classes.header_item_actions}>Actions</div>
        </Col>
      </Row>
      {productsState.map((product, index) => {
        return <Product product={product} key={index} />;
      })}
    </div>
  );
};

export default Table;
