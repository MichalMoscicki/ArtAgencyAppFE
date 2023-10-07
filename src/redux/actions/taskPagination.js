export const ADD_PAGINATION = "ADD_PAGINATION";

export const addTasksPaginationToState = (pagination) => {
    return {
        type: ADD_PAGINATION,
        payload: pagination
    }
}