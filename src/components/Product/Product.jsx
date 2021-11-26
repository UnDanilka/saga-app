import React from "react";
import { Row, Col, Button } from "antd";
import classes from "./Product.module.css";
import confirmDeleting from "../Modal/confirmDeleting";
import productInfo from "../Modal/productInfo";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productsActions";

const Product = (props) => {
  const { product } = props;

  const dispatch = useDispatch();

  const handleDeleteProduct = (name) => {
    dispatch(deleteProduct(name));
  };

  return (
    <Row className={classes.row}>
      <Col span={12}>
        <div
          className={`${classes.row_item} ${classes.row_item_name}`}
          onClick={() => productInfo(product)}
        >
          {product.name}
        </div>
      </Col>
      <Col span={5}>
        <div className={`${classes.row_item} ${classes.row_item_price}`}>
          {product.price}
        </div>
      </Col>
      <Col span={7}>
        <div className={`${classes.row_item} ${classes.row_item_actions}`}>
          <Button type="primary">Edit</Button>

          <Button
            onClick={() => confirmDeleting(product.name, handleDeleteProduct)}
            type="primary"
            danger
          >
            Delete
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Product;
