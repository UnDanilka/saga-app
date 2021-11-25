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
    default:
      return state;
  }
};
