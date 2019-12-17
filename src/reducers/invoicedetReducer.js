import {
  GET_INVOICEDETS,
  ADD_INVOICEDET,
  INVOICEDETS_LOADING,
  GET_ALL_INVOICEDETS
} from "../actions/types";

const initialState = {
  invoicedets: [],
  isLoaded: false,
  type: null,
  response: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICEDETS:
      return {
        ...state,
        invoicedets: action.payload,
        isLoaded: true,
        type: action.type,
      };

    case GET_ALL_INVOICEDETS:

      return {
        ...state,
        invoicedets: action.payload,
        isLoaded: true
      };
    case ADD_INVOICEDET:
      return {
        ...state,
        invoicedets: [action.payload, ...state.invoicedets],
        type: action.type,
        response: action.response,
      };
    case INVOICEDETS_LOADING:
      return {
        ...state,
        isLoaded: true
      };
    default:
      return state;
  }
}
