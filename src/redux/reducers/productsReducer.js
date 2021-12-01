import { REQUEST, SUCCESS, FAIL, DELETE, ADD, UPDATE } from "../types";

const initialState = {
  products: [],
  loading: false,
  error: "",
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        products: action.payload,
        error: "",
        loading: false,
      };
    case FAIL:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    case DELETE: {
      const prevProducts = [...state.products];
      const currProducts = prevProducts.filter(
        (product) => product.id !== action.payload
      );

      return {
        ...state,
        products: currProducts,
      };
    }

    case ADD: {
      const prevProduct = [...state.products];
      prevProduct.push(action.payload);
      const currProducts = prevProduct;
      return { ...state, products: currProducts };
    }

    case UPDATE: {
      const prevProduct = [...state.products];
      const currProducts = prevProduct.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });

      return { ...state, products: currProducts };
    }

    default:
      return state;
  }
};
