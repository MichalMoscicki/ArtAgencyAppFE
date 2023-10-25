const ADD_SINGLE_MUSICIAN = "ADD_SINGLE_MUSICIAN";
const ADD_MUSICIANS = "ADD_MUSICIANS";
const UPDATE_MUSICIAN = "UPDATE_MUSICIAN";
const REMOVE_MUSICIAN = "REMOVE_MUSICIAN";


const addMusiciansToState = (tasksList) => {
    return {
        type: ADD_MUSICIANS,
        payload: tasksList
    }
}

const addSingleMusician = (task) => {
    return {
        type: ADD_SINGLE_MUSICIAN,
        payload: task
    }
}
const updateMusician = (task) => {
    return {
        type: UPDATE_MUSICIAN,
        payload: task
    }
}

const removeMusician = (task) => {
    return {
        type: REMOVE_MUSICIAN,
        payload: task
    }
}


export {ADD_MUSICIANS, ADD_SINGLE_MUSICIAN, REMOVE_MUSICIAN, UPDATE_MUSICIAN,
    addSingleMusician, addMusiciansToState, removeMusician, updateMusician}