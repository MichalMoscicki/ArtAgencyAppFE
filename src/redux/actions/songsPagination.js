export const ADD_SONGS_PAGINATION = "ADD_TASKS_PAGINATION";

export const addSongsPaginationToState = (pagination) => {
    return {
        type: ADD_SONGS_PAGINATION,
        payload: pagination
    }
}