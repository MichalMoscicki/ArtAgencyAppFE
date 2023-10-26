export const ADD_MUSICIANS_PAGINATION = "ADD_MUSICIANS_PAGINATION";

export const addMusiciansPaginationToState = (pagination) => {
    return {
        type: ADD_MUSICIANS_PAGINATION,
        payload: pagination
    }
}