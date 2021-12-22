import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { IModalProps, IProduct } from "../../Interfaces";

const ModalInfo = ({ productsState }: IModalProps) => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const currentProduct = productsState.find((product) => {
      return product.id.toString() === params.id;
    });
    setProduct(currentProduct);
  }, [params.id, productsState]);

  return (
    <Modal
      visible
      title="Product info"
      footer=""
      onCancel={() => navigate("/")}
    >
      <div>
        <div>Name: {product?.name || "No Data"} </div>
        <div>Email: {product?.email || "No Data"}</div>
        <div>Amount: {product?.count || "No Data"}</div>
        <div>Price: {product?.price || "No Data"} $</div>
        <div>
          Delivery:
          {product?.delivery
            ? ` Country: ${
                product?.delivery.country
              }, Cities: ${product?.delivery.cities.join(",")}  `
            : "No delivery"}
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfo;
