import { REQUEST, SUCCESS, FAIL, DELETE, UPDATE, ADD } from "../types";

export const requestProducts = () => {
  return {
    type: REQUEST,
  };
};

export const successProducts = (products) => {
  return {
    type: SUCCESS,
    payload: products,
  };
};

export const failProducts = (error) => {
  return {
    type: FAIL,
    payload: error,
  };
};

export const deleteProduct = (id) => {
  return {
    type: DELETE,
    payload: id,
  };
};

export const updateProduct = (product) => {
  return {
    type: UPDATE,
    payload: product,
  };
};

export const addProduct = (newProduct) => {
  return {
    type: ADD,
    payload: newProduct,
  };
};
