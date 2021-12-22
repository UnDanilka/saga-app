import React from "react";
import { Row, Col, Button } from "antd";
import classes from "./Product.module.css";
import confirmDeleting from "../Modal/confirmDeleting";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productsActions";
import { useNavigate } from "react-router-dom";
import { IProductProps } from "../../Interfaces";

const Product = (props: IProductProps) => {
  const navigate = useNavigate();
  const { product } = props;

  const dispatch = useDispatch();

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
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
          <Button type="primary" onClick={() => navigate(`edit/${product.id}`)}>
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
    </Row>
  );
};

export default Product;
