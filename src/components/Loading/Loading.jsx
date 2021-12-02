import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import classes from "./Loading.module.css";

const Loading = () => {
  const icon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

  return (
    <div className={classes.loading_wrapper}>
      <Spin indicator={icon} />
    </div>
  );
};

export default Loading;
