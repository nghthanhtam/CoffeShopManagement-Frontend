import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_LOADING,
  UPDATE_CATEGORY,
} from './types'
import axios from 'axios'
import { tokenConfig } from './authActions'

const mongoose = require('mongoose')
export const getCategories = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  // dispatch(setCategoriesLoading());
  let newQuery = ''
  if (query === '') newQuery = 'undefined'
  else newQuery = query
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/category/${show}/${page}/${newQuery}`,
      tokenConfig(getState)
    )

    .then(response =>
      dispatch({ type: GET_CATEGORIES, payload: response.data })
    )
    .catch(er => console.log(er.response))
}

export const deleteCategory = id => (dispatch, getState) => {
  console.log(id)

  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_HOST}/api/category/${id}`,
      tokenConfig(getState)
    )
    .then(response => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: response.data,
      })
    })
    .catch(er => console.log(er.response))
}

export const addCategory = newCategory => (dispatch, getState) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_HOST}/api/category/`,
      newCategory,
      tokenConfig(getState)
    )
    .then(response => {
      if (newCategory._id instanceof mongoose.Types.ObjectId) {
        newCategory._id = newCategory._id.toString()
      }

      dispatch({
        type: ADD_CATEGORY,
        payload: newCategory,
      })
    })
    .catch(er => console.log(er.response))
}

export const setCategoriesLoading = () => {
  return {
    type: CATEGORIES_LOADING,
  }
}

export const updateCategory = newCategory => (dispatch, getState) => {
  axios
    .put(
      `${process.env.REACT_APP_BACKEND_HOST}/api/category/${newCategory._id}`,
      newCategory,
      tokenConfig(getState)
    )

    .then(response => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: response.data,
      })
    })
    .catch(error => {
      console.log(error.response)
    })
}
