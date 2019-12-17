import {
  GET_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE
} from "../actions/types";

const initialState = {
  roles: [],

  isLoaded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        isLoaded: true
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter(roles => roles._id !== action.payload._id)
      };
    case ADD_ROLE:
      return {
        ...state,
        roles: [action.payload, ...state.roles]
      };

    case UPDATE_ROLE:
      return {
        ...state
        // categories: [...state.slice(0, i), { ...state[i], likes }]
      };
    default:
      return state;
  }
}
