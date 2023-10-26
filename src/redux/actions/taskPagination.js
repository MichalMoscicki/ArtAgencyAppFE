export const ADD_TASKS_PAGINATION = "ADD_TASKS_PAGINATION";

export const addTasksPaginationToState = (pagination) => {
    return {
        type: ADD_TASKS_PAGINATION,
        payload: pagination
    }
}