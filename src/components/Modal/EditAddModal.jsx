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
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../redux/actions/productsActions";
import { useParams, useNavigate } from "react-router-dom";

const EditAddModal = ({ productsState }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { Option } = Select;
  const [deliveryType, setDeliveryType] = useState("noDelivery");
  const [country, setCountry] = useState({ country: "", init: false });
  const [cities, setCities] = useState([]);
  const [checkedCities, setCheckedCities] = useState([]);
  const [deliveryError, setDeliveryError] = useState(false);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const currentProduct = productsState.find((product) => {
      return product.id === +params.id;
    });
    setProduct(currentProduct);
  }, [params.id, productsState]);

  const handleCancel = () => {
    navigate("/");
    clearDelivery();
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      name: product?.name,
      email: product?.email,
      count: product?.count,
      price: product?.price,
    });
    if (product?.delivery) {
      console.log("cities", product.delivery.cities);
      setDeliveryType("city");
      setCountry({ country: product?.delivery?.country, init: true });
      setCheckedCities(product?.delivery.cities);
    }
    console.log("product", product);
  }, [product, form]);

  useEffect(() => {
    console.log("checkedCities", checkedCities);
  }, [checkedCities]);

  useEffect(() => {
    console.log("country", country);
  }, [country]);

  const clearDelivery = () => {
    setDeliveryType("noDelivery");
    setCountry({ country: "", init: false });
    setCities([]);
    setCheckedCities([]);
    setDeliveryError(false);
  };

  const formFinish = (props) => {
    if (deliveryError) {
      return;
    } else {
      let data = [];

      if (country.country) {
        data = {
          ...props,
          delivery: { country: country.country, cities: checkedCities },
        };
      } else {
        data = { ...props, delivery: null };
      }

      if (product) {
        data = { ...product, ...data };
        dispatch(updateProduct(data));
      } else {
        data = { ...data, id: uuidv4() };
        dispatch(addProduct(data));
      }
      form.resetFields();

      navigate("/");
      clearDelivery();
    }
  };

  const handleChangeDelivery = (props) => {
    setDeliveryType(props);
  };

  const handleChangeCountry = (props) => {
    setCountry({ country: props.target.value, init: false });
  };

  useEffect(() => {
    if (deliveryType === "noDelivery") setCountry("");
  }, [deliveryType]);

  useEffect(() => {
    if (country) {
      if (!country.init) {
        setCheckedCities([]);
      }
    }
    switch (country.country) {
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
    setCheckedCities([...props]);
  };

  const handleCheckAllChange = (e) => {
    setCheckedCities(e.target.checked ? cities : []);
  };

  useEffect(() => {
    if (deliveryType !== "noDelivery") {
      if (country.country) {
        if (checkedCities.length === 0) {
          setDeliveryError(true);
        } else {
          setDeliveryError(false);
        }
      }
    } else {
      setDeliveryError(false);
    }
  }, [checkedCities.length, country, deliveryType]);

  return (
    <Modal forceRender visible onCancel={handleCancel} footer="" centered>
      <Form layout="vertical" onFinish={formFinish} form={form}>
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
                onChange={handleChangeDelivery}
                value={deliveryType}
              >
                <Option value="noDelivery">No delivery</Option>
                <Option value="country">Country</Option>
                <Option value="city" disabled={!country.country}>
                  City
                </Option>
              </Select>
            </div>
            {deliveryType === "country" && (
              <div className={classes.delivery_radio}>
                <Radio.Group
                  onChange={handleChangeCountry}
                  value={country.country}
                >
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
                  indeterminate={
                    checkedCities.length !== 0 &&
                    checkedCities.length !== cities.length
                  }
                  onChange={handleCheckAllChange}
                  checked={cities.length === checkedCities.length}
                >
                  Check all
                </Checkbox>
                <Divider style={{ margin: "8px 0" }} />
                <Checkbox.Group
                  onChange={handleChecboxChange}
                  value={checkedCities}
                >
                  {cities.map((city, i) => {
                    return (
                      <Row key={i}>
                        <Checkbox value={city}>{ucFirst(city)}</Checkbox>
                      </Row>
                    );
                  })}
                </Checkbox.Group>
              </div>
            )}
          </div>
          <div className={classes.delivery_error_wrapper}>
            {deliveryError && (
              <div className={classes.delivery_error}>
                Please select the cities!
              </div>
            )}
          </div>
        </div>

        <Button type="primary" htmlType="submit">
          {product ? "UPDATE" : "ADD"}
        </Button>
      </Form>
    </Modal>
  );
};

export default EditAddModal;
