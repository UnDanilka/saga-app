const initialState = {
  products: [],
  loading: false,
  error: "",
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "request":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        products: action.payload,
        error: "",
        loading: false,
      };
    case "fail":
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    case "delete":
      const prevProducts = [...state.products];
      const currProducts = prevProducts.filter(
        (product) => product.id !== action.payload
      );

      return {
        ...state,
        products: currProducts,
      };
    default:
      return state;
  }
};
