import React from "react";
import { Row, Col, Button } from "antd";
import classes from "./Product.module.css";
import confirmDeleting from "../Modal/confirmDeleting";
import productInfo from "../Modal/productInfo";
import { Link, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productsActions";

const Product = (props) => {
  const { product, setEditModal } = props;

  const dispatch = useDispatch();

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = () => {
    setEditModal((prev) => {
      return { product, visible: true };
    });
  };

  return (
    <Row className={classes.row}>
      <Col span={12}>
        <div className={classes.row_item}>
          <Link to={`info/${product.id}`} className={classes.row_item_name}>
            {product.name || ""}
          </Link>
          <div className={classes.row_item_count}>{product.count || 0}</div>
        </div>
      </Col>
      <Col span={5}>
        <div className={`${classes.row_item} ${classes.row_item_price}`}>
          {product.price?.toLocaleString("ru") || 0} $
        </div>
      </Col>
      <Col span={7}>
        <div className={`${classes.row_item} ${classes.row_item_actions}`}>
          <Button type="primary" onClick={handleEdit}>
            Edit
          </Button>

          <Button
            onClick={() => confirmDeleting(product.id, handleDeleteProduct)}
            type="primary"
            danger
          >
            Delete
          </Button>
        </div>
      </Col>
      <Routes>
        <Route path="info/:id" element={() => productInfo(product)} />
      </Routes>
    </Row>
  );
};

export default Product;
