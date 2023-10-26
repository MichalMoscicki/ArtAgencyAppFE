import {ADD_CONTACTS_PAGINATION} from "../actions/contactsPagination";

const initialState = {pageNo: 0,
pageSize : 0,
totalElements: 0,
totalPages : 0,
last: false}


export const contactsPagination = (state = initialState, action) => {
    switch (action.type){
        case ADD_CONTACTS_PAGINATION:
            return action.payload
        default:
            return state
    }
}