import {ADD_MUSICIANS, UPDATE_MUSICIAN, REMOVE_MUSICIAN, ADD_SINGLE_MUSICIAN} from "../actions/musicians";

export const musicians = (state = [], action) => {
    switch (action.type){
        case ADD_SINGLE_MUSICIAN:
            return [action.payload, ...state]
        case ADD_MUSICIANS:
            return action.payload;
        case UPDATE_MUSICIAN:
            const updatedContacts = [...state];
            const index = updatedContacts.findIndex( (el) => el.id === action.payload.id)
            if(index === -1){
                console.log("Błąd! Spr musicians reducer!")
                return state
            }
            updatedContacts[index] = action.payload
            return updatedContacts
        case REMOVE_MUSICIAN:
            return [...state].filter( (el) => el !== action.payload)
        default:
            return state
    }
}