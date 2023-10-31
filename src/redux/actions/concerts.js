const ADD_SINGLE_CONCERT = "ADD_SINGLE_CONCERT";
const ADD_CONCERTS = "ADD_CONCERTS";
const UPDATE_CONCERT = "UPDATE_CONCERT";
const REMOVE_CONCERT = "REMOVE_CONCERT";

const addConcertsToState = (concertsList) => {
    return {
        type: ADD_CONCERTS,
        payload: concertsList
    }
}
const addSingleConcertToState = (concert) => {
    return {
        type: ADD_SINGLE_CONCERT,
        payload: concert
    }
}
const updateConcertInState = (concert) => {
    return {
        type: UPDATE_CONCERT,
        payload: concert
    }
}
const removeConcertFromState = (concert) => {
    return {
        type: REMOVE_CONCERT,
        payload: concert
    }
}

export {ADD_CONCERTS, ADD_SINGLE_CONCERT, REMOVE_CONCERT, UPDATE_CONCERT,
    addConcertsToState, addSingleConcertToState, updateConcertInState, removeConcertFromState}