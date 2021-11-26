import { Modal } from "antd";

const productInfo = (product) => {
  const info = (
    <div>
      <div>Name: {product.name}</div>
      <div>Email: {product.email}</div>
      <div>Amount: {product.count}</div>
      <div>Price: {product.price}</div>
      <div>
        Delivery:
        {product.delivery
          ? `${product.delivery.country}, ${product.delivery.cities.join(
              ","
            )}  `
          : "No delivery"}
      </div>
    </div>
  );

  Modal.info({
    title: "Product info",
    content: info,
  });
};

export default productInfo;
