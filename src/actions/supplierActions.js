import {
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  DELETE_SUPPLIER,
  GET_SUPPLIER,
  UPDATE_SUPPLIER
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

import mongoose from "mongoose";

export const getSuppliers = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  // dispatch(setSuppliersLoading());
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_SUPPLIERS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deleteSupplier = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_SUPPLIER,
        payload: response.data
      });
    });
};

export const addSupplier = newSupplier => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/`,
      newSupplier,
      tokenConfig(getState)
    )
    .then(response => {
      if (newSupplier._id instanceof mongoose.Types.ObjectId) {
        newSupplier._id = newSupplier._id.toString();
      }
      dispatch({
        type: ADD_SUPPLIER,
        payload: newSupplier
      });
    });
};

export const updateSupplier = newSupplier => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/supplier/${newSupplier._id}`,
      newSupplier,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_SUPPLIER,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
