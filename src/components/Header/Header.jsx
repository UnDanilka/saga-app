import React from "react";
import { Row, Col } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import classes from "./Header.module.css";

const Header = ({ sorting, setSorting }) => {
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

  return (
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
  );
};

export default Header;
