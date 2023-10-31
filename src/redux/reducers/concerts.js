import {ADD_CONCERTS, ADD_SINGLE_CONCERT, REMOVE_CONCERT, UPDATE_CONCERT} from "../actions/concerts";

export const concerts = (state = [], action) => {
    switch (action.type) {
        case ADD_SINGLE_CONCERT:
            return [action.payload, ...state]
        case ADD_CONCERTS:
            return action.payload;
        case UPDATE_CONCERT:
            const concerts = [...state];
            const index = concerts.findIndex((el) => el.id === action.payload.id)
            if (index === -1) {
                console.log("Błąd! Spr concert reducer!")
                return state
            }
            concerts[index] = action.payload
            return concerts
        case REMOVE_CONCERT:
            return [...state].filter((el) => el !== action.payload)
        default:
            return state
    }
}