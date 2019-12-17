import {
  GET_PAYSLIPS,
  ADD_PAYSLIP,
  DELETE_PAYSLIP,
  PAYSLIPS_LOADING
} from "./types";
import axios from "axios";

import mongoose from "mongoose";
import { tokenConfig } from "./authActions";

export const getPaySlips = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/payslip/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_PAYSLIPS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deletePaySlip = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/payslip/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_PAYSLIP,
        payload: response.data
      });
    });
};

export const addPaySlip = newPaySlip => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/payslip/`,
      newPaySlip,
      tokenConfig(getState)
    )
    .then(response => {
      if (newPaySlip._id instanceof mongoose.Types.ObjectId) {
        newPaySlip._id = newPaySlip._id.toString();
      }

      dispatch({
        type: ADD_PAYSLIP,
        payload: newPaySlip,
        response: response.status
      });
    });
};

export const setPaySlipsLoading = () => {
  return {
    type: PAYSLIPS_LOADING
  };
};
