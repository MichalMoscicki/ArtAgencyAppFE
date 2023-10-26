import {ADD_TASKS_PAGINATION} from "../actions/taskPagination";

const initialState = {pageNo: 0,
    pageSize : 0,
    totalElements: 0,
    totalPages : 0,
    last: false}


export const tasksPagination = (state = initialState, action) => {
    switch (action.type){
        case ADD_TASKS_PAGINATION:
            return action.payload
        default:
            return state
    }
}