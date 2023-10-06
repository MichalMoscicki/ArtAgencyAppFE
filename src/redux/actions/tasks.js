const ADD_SINGLE_TASK = "ADD_SINGLE_TASK";
const ADD_TASKS = "ADD_TASKS";
const UPDATE_TASK = "UPDATE_TASK";
const REMOVE_TASK = "REMOVE_TASK";


const addTasksToState = (tasksList) => {
    return {
        type: ADD_TASKS,
        payload: tasksList
    }
}

const addSingleTask = (task) => {
    return {
        type: ADD_SINGLE_TASK,
        payload: task
    }
}
const updateTask = (task) => {
    return {
        type: UPDATE_TASK,
        payload: task
    }
}

const removeTask = (task) => {
    return {
        type: REMOVE_TASK,
        payload: task
    }
}


export {ADD_TASKS, ADD_SINGLE_TASK, REMOVE_TASK, UPDATE_TASK,
    addSingleTask, addTasksToState, removeTask, updateTask}