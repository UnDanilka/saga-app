import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Radio,
  Space,
  Checkbox,
  Row,
  Divider,
} from "antd";
import classes from "./EditAddModal.module.css";

const EditAddModal = ({ editModal, setEditModal }) => {
  const { Option } = Select;
  const [deliveryType, setDeliveryType] = useState("");
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);

  const handleOk = () => {
    setEditModal((prev) => {
      return { product: null, visible: false };
    });
  };

  const formFinish = (props) => {
    console.log(props);
  };

  const handleChangeDelivery = (props) => {
    setDeliveryType(props);
  };

  const handleChangeCountry = (props) => {
    setCountry(props.target.value);
  };

  useEffect(() => {
    if (deliveryType === "noDelivery") setCountry("");
  }, [deliveryType]);

  useEffect(() => {
    switch (country) {
      case "russia":
        setCities(["moscow", "kazan", "saratov"]);
        break;
      case "usa":
        setCities(["new-york", "los-angeles", "boston"]);
        break;
      case "japan":
        setCities(["tokyo", "osaka", "kyoto"]);
        break;
      default:
        setCities([]);
    }
  }, [country]);

  const ucFirst = (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  };

  const handleChecboxChange = (props) => {
    console.log(props);
  };

  return (
    <Modal title="Basic Modal" visible={editModal.visible} onOk={handleOk}>
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={formFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input name!" },
            { max: 15 },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Supplier email"
          name="email"
          rules={[{ type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Count" name="count">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <div className={classes.delivery_wrapper}>
          <div className={classes.delivery_label}>Delivery</div>
          <div className={classes.delivery_boxes}>
            <div>
              <Select
                style={{ width: 150 }}
                defaultValue="noDelivery"
                onChange={handleChangeDelivery}
              >
                <Option value="noDelivery">No delivery</Option>
                <Option value="country">Country</Option>
                <Option value="city" disabled={!country}>
                  City
                </Option>
              </Select>
            </div>
            {deliveryType === "country" && (
              <div className={classes.delivery_radio}>
                <Radio.Group onChange={handleChangeCountry} value={country}>
                  <Space direction="vertical">
                    <Radio value="russia">Russia</Radio>
                    <Radio value="usa">USA</Radio>
                    <Radio value="japan">Japan</Radio>
                  </Space>
                </Radio.Group>
              </div>
            )}
            {deliveryType === "city" && (
              <div className={classes.delivery_checkbox}>
                <Checkbox
                // indeterminate={indeterminate}
                // onChange={onCheckAllChange}
                // checked={checkAll}
                >
                  Check all
                </Checkbox>
                <Divider style={{ margin: "8px 0" }} />
                <Checkbox.Group
                  style={{ display: "block" }}
                  onChange={handleChecboxChange}
                  value={[]}
                >
                  {cities.map((city) => {
                    return (
                      <Row>
                        <Checkbox value={city}>{ucFirst(city)}</Checkbox>
                      </Row>
                    );
                  })}
                </Checkbox.Group>
              </div>
            )}
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Add/Update
        </Button>
      </Form>
    </Modal>
  );
};

export default EditAddModal;
