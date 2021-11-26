import { Modal } from "antd";

const confirmDeleting = (name, deleteProduct) => {
  Modal.confirm({
    title: "Are you sure?",
    content: "Are you sure you want to remove this item?",
    okText: "Confirm",
    cancelText: "Cancel",
    onOk: () => deleteProduct(name),
  });
};

export default confirmDeleting;
