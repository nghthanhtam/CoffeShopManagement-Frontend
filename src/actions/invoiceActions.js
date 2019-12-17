import {
  GET_INVOICES,
  ADD_INVOICE,
  DELETE_INVOICE,
  GET_INVOICE
} from "./types";
import axios from "axios";

import { tokenConfig } from "./authActions";

export const getInvoices = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_INVOICES, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deleteInvoice = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_INVOICE,
        payload: response.data
      });
    });
};

export const addInvoice = newInvoice => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/invoice/`,
      newInvoice,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: ADD_INVOICE,
        payload: newInvoice,
        response: response.status
      });
    });
};
