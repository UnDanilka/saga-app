import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import classes from "./Table.module.css";
import Product from "../Product/Product";

const Table = (props) => {
  const { products } = props.data;
  const [productsState, setProductsState] = useState(products);

  useEffect(() => {
    setProductsState(products);
  }, [products]);

  return (
    <div className={classes.main_table}>
      <Row className={classes.header}>
        <Col span={12}>
          <div className={classes.header_item}>Name</div>
        </Col>
        <Col span={5}>
          <div className={classes.header_item}>Price </div>
        </Col>
        <Col span={7}>
          <div className={classes.header_item}>Actions</div>
        </Col>
      </Row>
      {productsState.map((product, index) => {
        return <Product product={product} key={index} />;
      })}
    </div>
  );
};

export default Table;
