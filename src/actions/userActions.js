import { GET_USERS, ADD_USER, DELETE_USER, CHECK_CUR_PASS_USER } from "./types";
import axios from "axios";

import { tokenConfig } from "./authActions";

export const getUsers = (show = 5, page = 1, query) => (dispatch, getState) => {
  // dispatch(setUsersLoading());
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_USERS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deleteUser = id => dispatch => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_USER,
        payload: response.data
      });
    });
};

export const addUser = newUser => dispatch => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/`,
      newUser,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: ADD_USER,
        payload: newUser
      });
    });
};

export const checkCurPassUser = id => dispatch => {
  console.log("userActionCheckCurPass");
  axios
    .post(`${process.env.REACT_APP_BACKEND_HOST}/api/cp/${id}`)
    .then(response => {
      // console.log("userActionCheckCurPass");
      dispatch({
        type: CHECK_CUR_PASS_USER,
        payload: response.data
      });
    });
};
