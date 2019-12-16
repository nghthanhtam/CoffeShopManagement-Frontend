import {
  GET_SEARCH_REPORTS,
  GET_REPORTS,
  ADD_REPORT,
  DELETE_REPORT
} from "../actions/types";

const initialState = {
  storagereports: [],
  isLoaded: false,
  response: null,
  type: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REPORTS:
      return {
        ...state,
        storagereports: action.payload,
        isLoaded: true,
        type: action.type
      };
    case GET_SEARCH_REPORTS:
      return {
        ...state,
        storagereports: action.payload,
        isLoaded: true,
        type: action.type
      };
    case DELETE_REPORT:
      return {
        ...state,
        storagereports: state.storagereports.filter(
          report => report._id !== action.payload._id
        ),
        type: action.type
      };
    case ADD_REPORT:
      return {
        ...state,
        storagereports: [action.payload, ...state.storagereports],
        response: action.response,
        type: action.type
      };

    default:
      return state;
  }
}
