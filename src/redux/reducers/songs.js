import {ADD_SINGLE_SONG, ADD_SONGS, REMOVE_SONG, UPDATE_SONG} from "../actions/songs";

export const songs = (state = [], action) => {
    switch (action.type){
        case ADD_SINGLE_SONG:
            return [action.payload, ...state]
        case ADD_SONGS:
            return action.payload;
        case UPDATE_SONG:
            const updatedContacts = [...state];
            const index = updatedContacts.findIndex( (el) => el.id === action.payload.id)
            if(index === -1){
                console.log("Błąd! Spr songs reducer!")
                return state
            }
            updatedContacts[index] = action.payload
            return updatedContacts
        case REMOVE_SONG:
            return [...state].filter( (el) => el !== action.payload)
        default:
            return state
    }
}