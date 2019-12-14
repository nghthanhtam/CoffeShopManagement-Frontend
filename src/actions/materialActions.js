import {
  GET_MATERIALS,
  ADD_MATERIAL,
  DELETE_MATERIAL,
  MATERIALS_LOADING,
  UPDATE_MATERIAL
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

const mongoose = require("mongoose");

export const getMaterials = (show = 10, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/material/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_MATERIALS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const deleteMaterial = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/material/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_MATERIAL,
        payload: response.data
      });
    });
};

export const addMaterial = newMaterial => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/material/`,
      newMaterial,
      tokenConfig(getState)
    )
    .then(response => {
      if (newMaterial._id instanceof mongoose.Types.ObjectId) {
        newMaterial._id = newMaterial._id.toString();
      }
      console.log(newMaterial);
      dispatch({
        type: ADD_MATERIAL,
        payload: newMaterial
      });
    })
    .catch(er => console.log(er.response));
};

export const setMaterialsLoading = () => {
  return {
    type: MATERIALS_LOADING
  };
};

export const updateMaterial = newMaterial => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/material/${newMaterial._id}`,
      newMaterial,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_MATERIAL,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
