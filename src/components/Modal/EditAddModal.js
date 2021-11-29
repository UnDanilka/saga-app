import React from "react";
import { Modal } from "antd";

const EditAddModal = ({ editModal, setEditModal }) => {
  const handleOk = () => {
    setEditModal((prev) => {
      return { product: null, visible: false };
    });
  };

  return (
    <Modal
      title="Basic Modal"
      visible={editModal.visible}
      onOk={handleOk}
    ></Modal>
  );
};

export default EditAddModal;
