import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING,
  CHECK_CUR_PASS_USER,
  UPDATE_USER
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

const mongoose = require("mongoose");
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

export const deleteUser = id => (dispatch, getState) => {
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
    })
    .catch(er => console.log(er.response));
};

export const addUser = newUser => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/`,
      newUser,
      tokenConfig(getState)
    )
    .then(response => {
      if (newUser._id instanceof mongoose.Types.ObjectId) {
        newUser._id = newUser._id.toString();
      }
      console.log(newUser);
      dispatch({
        type: ADD_USER,
        payload: newUser
      });
    });
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};

export const checkCurPassUser = id => (dispatch, getState) => {
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

export const updateUser = newUser => (dispatch, getState) => {
  console.log(newUser);
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/user/${newUser._id}`,
      newUser,
      tokenConfig(getState)
    )

    .then(response => {
      console.log(response);
      dispatch({
        type: UPDATE_USER,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
