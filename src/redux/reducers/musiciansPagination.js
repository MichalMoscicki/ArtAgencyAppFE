import {ADD_MUSICIANS_PAGINATION} from "../actions/musiciansPagination";

const initialState = {pageNo: 0,
    pageSize : 0,
    totalElements: 0,
    totalPages : 0,
    last: false}

export const musiciansPagination = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MUSICIANS_PAGINATION:
            return action.payload
        default:
            return state
    }
}