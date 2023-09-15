export const ADD_PAGINATION = "ADD_PAGINATION";

export const addContactsPaginationToState = (pagination) => {
    return {
        type: ADD_PAGINATION,
        payload: pagination
    }
}