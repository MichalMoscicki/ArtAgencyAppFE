export const ADD_CONTACTS_PAGINATION = "ADD_CONTACTS_PAGINATION";

export const addContactsPaginationToState = (pagination) => {
    return {
        type: ADD_CONTACTS_PAGINATION,
        payload: pagination
    }
}