export const requestProducts = () => {
  return {
    type: "request",
  };
};

export const successProducts = (products) => {
  return {
    type: "success",
    payload: products,
  };
};

export const failProducts = (error) => {
  return {
    type: "fail",
    payload: error,
  };
};

export const deleteProduct = (id) => {
  return {
    type: "delete",
    payload: id,
  };
};
