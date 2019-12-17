import {
  GET_INVOICEDETS,
  ADD_INVOICEDET,
  GET_ALL_INVOICEDETS,
  INVOICEDETS_LOADING,
} from './types'
import axios from 'axios'
import { tokenConfig } from './authActions'

export const getInvoiceDets = (show = 5, page = 1, query) => (
  dispatch,
  getState
) => {
  let newQuery = ''
  if (query === '') newQuery = 'undefined'
  else newQuery = query
  axios
    .get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/invoicedet/${show}/${page}/${newQuery}`, tokenConfig(getState)
    )

    .then(response => dispatch({ type: GET_INVOICEDETS, payload: response.data }))
    .catch(er => console.log(er.response))
}

export const getAllInvoiceDets = (query) => (dispatch) => {
  let newQuery = ''
  if (query === '') newQuery = 'undefined'
  else newQuery = query

  axios
    .get(`${process.env.REACT_APP_BACKEND_HOST}/api/invoicedetdet/getall/${newQuery}`)
    .then(response => dispatch({ type: GET_ALL_INVOICEDETS, payload: response.data }))
    .catch(er => console.log(er.response));
};


export const addInvoiceDet = newInvoiceDet => (dispatch, getState) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_HOST}/api/invoicedet/`, newInvoiceDet, tokenConfig(getState))
    .then(response => {
      dispatch({
        type: ADD_INVOICEDET,
        payload: newInvoiceDet,
        response: response.status,
      })
    })
}

export const setInvoicesLoading = () => {
  return {
    type: INVOICEDETS_LOADING,
  }
}
