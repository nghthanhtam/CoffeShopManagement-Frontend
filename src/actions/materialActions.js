import {
    GET_MATERIALS,
    ADD_MATERIAL,
    DELETE_MATERIAL,
    MATERIALS_LOADING,
    GET_ALL_MATERIALS,
} from "./types";
import axios from "axios";
import { tokenConfig } from './authActions'

export const getMaterials = (show = 10, page = 1, query) => (
    dispatch,
    getState
) => {
    let newQuery = "";
    if (query === "") newQuery = "undefined";
    else newQuery = query;
    axios
        .get(`/api/material/${show}/${page}/${newQuery}`, tokenConfig(getState))

        .then(response => dispatch({ type: GET_MATERIALS, payload: response.data }))
        .catch(er => console.log(er.response));
};

export const getAllMaterials = (query) => dispatch => {

    let newQuery = ''
    if (query === '') newQuery = 'undefined'
    else newQuery = query

    axios
        .get(`${process.env.REACT_APP_BACKEND_HOST}/api/material/getall/${newQuery}`)
        .then(response => dispatch({ type: GET_ALL_MATERIALS, payload: response.data }))
        .catch(er => console.log(er.response));
};

export const deleteMaterial = id => (dispatch, getState) => {
    axios.delete(`/api/material/${id}`, tokenConfig(getState)).then(response => {
        dispatch({
            type: DELETE_MATERIAL,
            payload: response.data
        });
    });
};

export const addMaterial = newMaterial => dispatch => {
    axios
        .post("/api/material/", newMaterial, tokenConfig(getState))
        .then(response => {
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