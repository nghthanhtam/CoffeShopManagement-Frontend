import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT
} from "./types";
import axios from "axios";

import { tokenConfig } from "./authActions";

export const getProducts = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/product/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response =>
      //console.log(response.data)
      dispatch({ type: GET_PRODUCTS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const deleteProduct = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/product/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: response.data
      });
    });
};

export const addProduct = newProduct => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/product/`,
      newProduct,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: ADD_PRODUCT,
        payload: newProduct
      });
    });
};
