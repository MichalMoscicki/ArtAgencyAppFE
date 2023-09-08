const ADD_SINGLE_CONTACT = "ADD_SINGLE_CONTACT";
const ADD_CONTACTS = "ADD_CONTACTS";
const UPDATE_CONTACT = "UPDATE_CONTACT";
const REMOVE_CONTACT = "REMOVE_CONTACT";


const addContactsToState = (contactsList) => {
    return {
        type: ADD_CONTACTS,
        payload: contactsList
    }
}

const addSingleContact = (contact) => {
    return {
        type: ADD_SINGLE_CONTACT,
        payload: contact
    }
}
const updateContact = (contact) => {
    return {
        type: UPDATE_CONTACT,
        payload: contact
    }
}

const removeContact = (contact) => {
    return {
        type: REMOVE_CONTACT,
        payload: contact
    }
}


export {ADD_CONTACTS, ADD_SINGLE_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT,
    addContactsToState, removeContact, addSingleContact, updateContact}