import {ADD_SINGLE_CONTACT, ADD_CONTACTS, UPDATE_CONTACT, REMOVE_CONTACT} from "../actions/contacts";


export const contacts = (state = [1, 2, 3], action) => {
    switch (action.type){
        case ADD_SINGLE_CONTACT:
            return [...state, action.payload]
        case ADD_CONTACTS:
            return [action.payload]
        case UPDATE_CONTACT:
            const filteredContacts = [...state].filter( (contact) => contact.id !== action.payload.id);
            const updatedContacts = [...filteredContacts, action.payload];
            return [updatedContacts]
        case REMOVE_CONTACT:
            return [...state].filter( (contact) => contact !== action.payload)
        default:
            return state
    }
}