import {ADD_CONCERTS_PAGINATION} from "../actions/concertPagination";


const initialState = {pageNo: 0,
    pageSize : 0,
    totalElements: 0,
    totalPages : 0,
    last: false}


export const concertsPagination = (state = initialState, action) => {
    switch (action.type){
        case ADD_CONCERTS_PAGINATION:
            return action.payload
        default:
            return state
    }
}