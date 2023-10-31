import {ADD_INSTRUMENTS, ADD_SINGLE_INSTRUMENT, REMOVE_INSTRUMENT, UPDATE_INSTRUMENT} from "../actions/instruments";

export const instruments = (state = [], action) => {
    switch (action.type){
        case ADD_SINGLE_INSTRUMENT:
            return [...state, action.payload]
        case ADD_INSTRUMENTS:
            return action.payload;
        case UPDATE_INSTRUMENT:
            const updatedContacts = [...state];
            const index = updatedContacts.findIndex( (el) => el.id === action.payload.id)
            if(index === -1){
                console.log("Błąd! Spr instruments reducer!")
                return state
            }
            updatedContacts[index] = action.payload
            return updatedContacts
        case REMOVE_INSTRUMENT:
            return [...state].filter( (contact) => contact !== action.payload)
        default:
            return state
    }
}