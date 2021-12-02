import { Modal } from "antd";

const productInfo = (product) => {
  const info = (
    <div>
      <div>Name: {product.name || "No Data"} </div>
      <div>Email: {product.email || "No Data"}</div>
      <div>Amount: {product.count || "No Data"}</div>
      <div>Price: {product.price || "No Data"} $</div>
      <div>
        Delivery:
        {product.delivery
          ? ` Country: ${
              product.delivery.country
            }, Cities: ${product.delivery.cities.join(",")}  `
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
