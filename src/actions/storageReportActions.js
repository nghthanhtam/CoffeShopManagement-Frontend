import {
  GET_SEARCH_REPORTS,
  GET_REPORTS,
  ADD_REPORT,
  DELETE_REPORT
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

import mongoose from "mongoose";

export const getStorageReports = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/storagereport/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response =>
      //console.log(response.data)
      dispatch({ type: GET_REPORTS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const getSearchStorageReports = query => dispatch => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/storagereport/search/${newQuery}`
    )

    .then(response =>
      dispatch({ type: GET_SEARCH_REPORTS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const deleteStorageReport = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/storagereport/${id}`,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: DELETE_REPORT,
        payload: response.data
      });
    });
};

export const addStorageReport = newItem => (dispatch, getState) => {
  console.log(newItem._id);
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/storagereport/`,
      newItem,
      tokenConfig(getState)
    )

    .then(response => {
      if (newItem._id instanceof mongoose.Types.ObjectId) {
        newItem._id = newItem._id.toString();
      }

      dispatch({
        type: ADD_REPORT,
        payload: newItem,
        response: response.status
      });
    });
};
