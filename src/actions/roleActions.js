import { GET_ROLES, ADD_ROLE, DELETE_ROLE, UPDATE_ROLE } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import mongoose from "mongoose";

export const getRoles = (show = 5, page = 1, query) => (dispatch, getState) => {
  // dispatch(setCategoriesLoading());
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/role/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_ROLES, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deleteRole = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/role/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_ROLE,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

export const addRole = newRole => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/role/`,
      newRole,
      tokenConfig(getState)
    )
    .then(response => {
      if (newRole._id instanceof mongoose.Types.ObjectId) {
        newRole._id = newRole._id.toString();
      }
      dispatch({
        type: ADD_ROLE,
        payload: newRole
      });
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateRole = newRole => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/role/${newRole._id}`,
      newRole,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_ROLE,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
