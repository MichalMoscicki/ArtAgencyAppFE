const ADD_SINGLE_INSTRUMENT = "ADD_SINGLE_INSTRUMENT";
const ADD_INSTRUMENTS = "ADD_INSTRUMENTS";
const UPDATE_INSTRUMENT = "UPDATE_INSTRUMENT";
const REMOVE_INSTRUMENT = "REMOVE_INSTRUMENT";


const addInstrumentsToState = (instrumentsList) => {
    return {
        type: ADD_INSTRUMENTS,
        payload: instrumentsList
    }
}

const addSingleInstrument = (instrument) => {
    return {
        type: ADD_SINGLE_INSTRUMENT,
        payload: instrument
    }
}
const updateInstrument = (instrument) => {
    return {
        type: UPDATE_INSTRUMENT,
        payload: instrument
    }
}

const removeInstrument = (instrument) => {
    return {
        type: REMOVE_INSTRUMENT,
        payload: instrument
    }
}


export {ADD_INSTRUMENTS, ADD_SINGLE_INSTRUMENT, REMOVE_INSTRUMENT, UPDATE_INSTRUMENT,
        addInstrumentsToState, addSingleInstrument, updateInstrument, removeInstrument}