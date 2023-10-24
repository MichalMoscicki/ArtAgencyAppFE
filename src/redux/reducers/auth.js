import {ADD_TOKEN} from "../actions/auth";
export const auth = (state = "", action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return action.payload
        default:
            return state
    }
}