export const ADD_CONCERTS_PAGINATION = "ADD_CONCERTS_PAGINATION";

export const addConcertsPaginationToState = (pagination) => {
    return {
        type: ADD_CONCERTS_PAGINATION,
        payload: pagination
    }
}