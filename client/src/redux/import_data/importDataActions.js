import {
    SERVER_REQUEST,SERVER_REQUEST_FAILURE,IMPORT_DATA_SUCCESS
} from "./importDataTypes";

import axios from "axios";

// User Actions Creator
export const serverRequest = () => {
    return {
        type: SERVER_REQUEST,
    };
};
export const importDataSuccess = (data) => {
    return {
        type: IMPORT_DATA_SUCCESS,
        payload: data,
    };
};
export const serverRequestFailure = (error) => {
    return {
        type: SERVER_REQUEST_FAILURE,
        payload: error,
    };
};
export const importData = (formData) => {
    console.log('---- importData :>>',formData);
    return (dispatch) => {
        dispatch(serverRequest);
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
        axios
            .post("/upload",formData)
            .then((response) => {
                const import_data = response.data;
                console.log('---- importData import_data :>>', import_data);

                
                dispatch(importDataSuccess(import_data));
            })
            .catch((error) => {
                console.error('---- importData error :>>', error);
                const errorMsg = error.message;
                dispatch(serverRequestFailure(errorMsg));
            });
    };
};


export const editImportData = (data) => {
    return {
        type: "EDIT_IMPORT_DATA",
        payload: data,
    };
};