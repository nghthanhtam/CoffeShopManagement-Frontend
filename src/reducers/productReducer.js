import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT
} from "../actions/types";

const initialState = {
  products: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(prod => prod._id !== action.payload._id)
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };

    default:
      return state;
  }
}
