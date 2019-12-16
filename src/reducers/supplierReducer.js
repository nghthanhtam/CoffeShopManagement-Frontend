import {
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  DELETE_SUPPLIER,
  GET_SUPPLIER,
  UPDATE_SUPPLIER
} from "../actions/types";

const initialState = {
  suppliers: [],

  isLoaded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
        isLoaded: true
      };
    case DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          supplier => supplier._id !== action.payload._id
        )
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [action.payload, ...state.suppliers]
      };
    case UPDATE_SUPPLIER:
      return {
        ...state
        // categories: [...state.slice(0, i), { ...state[i], likes }]
      };

    default:
      return state;
  }
}
