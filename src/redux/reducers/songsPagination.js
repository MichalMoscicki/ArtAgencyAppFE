import {ADD_SONGS_PAGINATION} from "../actions/songsPagination";

const initialState = {pageNo: 0,
    pageSize : 0,
    totalElements: 0,
    totalPages : 0,
    last: false}

export const songsPagination = (state = initialState, action) => {
    switch (action.type){
        case ADD_SONGS_PAGINATION:
            return action.payload
        default:
            return state
    }
}