import {ADD_CONTACTS, ADD_SINGLE_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT} from "../actions/contacts";


export const contacts = (state = [], action) => {
    switch (action.type){
        case ADD_SINGLE_CONTACT:
            return [...state, action.payload]
        case ADD_CONTACTS:
            return action.payload;
        case UPDATE_CONTACT:
            const updatedContacts = [...state];
            const index = updatedContacts.findIndex( (el) => el.id === action.payload.id)
            if(index === -1){
                console.log("Błąd! Spr contacs reducer!")
                return state
            }
            updatedContacts[index] = action.payload
            return updatedContacts
        case REMOVE_CONTACT:
            return [...state].filter( (contact) => contact !== action.payload)
        default:
            return state
    }
}