import { Modal } from "antd";

const confirmDeleting = (id: number, deleteProduct: (id: number) => void) => {
  Modal.confirm({
    title: "Are you sure?",
    content: "Are you sure you want to remove this item?",
    okText: "Confirm",
    cancelText: "Cancel",
    onOk: () => deleteProduct(id),
  });
};

export default confirmDeleting;
