import {
  GET_SEARCH_MEMBERS,
  GET_MEMBERS,
  ADD_MEMBER,
  DELETE_MEMBER,
  UPDATE_MEMBER
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import mongoose from "mongoose";

export const getMembers = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/member/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_MEMBERS, payload: response.data }))
    .catch(er => console.log(er.response));
};

export const getSearchMembers = query => dispatch => {
  let newQuery = "";
  if (query === "") newQuery = "undefined";
  else newQuery = query;
  axios
    .get(`${process.env.REACT_APP_BACKEND_HOST}/api/member/search/${newQuery}`)

    .then(response =>
      dispatch({ type: GET_SEARCH_MEMBERS, payload: response.data })
    )
    .catch(er => console.log(er.response));
};

export const deleteMember = id => (dispatch, getState) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/member/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_MEMBER,
        payload: response.data
      });
    });
};

export const addMember = newMember => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/member/`,
      newMember,
      tokenConfig(getState)
    )
    .then(response => {
      if (newMember._id instanceof mongoose.Types.ObjectId) {
        newMember._id = newMember._id.toString();
      }

      dispatch({
        type: ADD_MEMBER,
        payload: newMember,
        response: response.status
      });
    });
};

export const updateMember = newMember => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/member/${newMember._id}`,
      newMember,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_MEMBER,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error.response);
    });
};
