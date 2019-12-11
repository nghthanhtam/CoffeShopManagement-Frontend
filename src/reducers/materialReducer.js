import {
    GET_MATERIALS,
    GET_ALL_MATERIALS,
    ADD_MATERIAL,
    DELETE_MATERIAL,
    MATERIALS_LOADING
} from "../actions/types";

const initialState = {
    materials: [],
    isLoaded: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MATERIALS:
            return {
                ...state,
                materials: action.payload,
                isLoaded: false
            };
        case GET_ALL_MATERIALS:

            return {
                ...state,
                materials: action.payload,
                isLoaded: true
            };
        case DELETE_MATERIAL:
            return {
                ...state,
                materials: state.materials.filter(
                    material => material._id !== action.payload._id
                )
            };

        case ADD_MATERIAL:
            return {
                ...state,
                materials: [action.payload, ...state.materials]
            };

        case MATERIALS_LOADING:
            return {
                ...state,
                isLoaded: true
            };
        default:
            return state;
    }
}