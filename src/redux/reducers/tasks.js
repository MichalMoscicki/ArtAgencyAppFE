import {ADD_TASKS, UPDATE_TASK, REMOVE_TASK, ADD_SINGLE_TASK} from "../actions/tasks";


export const tasks = (state = [], action) => {
    switch (action.type){
        case ADD_SINGLE_TASK:
            return [action.payload, ...state]
        case ADD_TASKS:
            return action.payload;
        case UPDATE_TASK:
            const updatedContacts = [...state];
            const index = updatedContacts.findIndex( (el) => el.id === action.payload.id)
            if(index === -1){
                console.log("Błąd! Spr tasks reducer!")
                return state
            }
            updatedContacts[index] = action.payload
            return updatedContacts
        case REMOVE_TASK:
            return [...state].filter( (el) => el !== action.payload)
        default:
            return state
    }
}