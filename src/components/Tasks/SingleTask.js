import React from "react";
import {deleteTaskById, updateTaskById} from "../../api/tasks";
import "./SingleTask.css"


export const SingleTask = ({task, updateTaskInState, removeTaskFromState}) => {

    const handleDelete = () => {
        deleteTaskById(task.id)
        removeTaskFromState(task);
    }
    const handleCompleted = async () => {
        const updatedTask = {...task, finished: true, active:false};
        const response = await updateTaskById(updatedTask.id, updatedTask)
        await updateTaskInState(response)
    }

    return (

        <li className={"task"}>
                <span className={"task-title"}>{task.title}</span>
                <span>{task.active ? " aktywne" : " nieaktywne"}</span>
                <span>{task.finished ? " zrobione" : " niezrobione"}</span>
                <span>
                    <button onClick={handleCompleted}>Zrobione</button>
                    <button onClick={handleDelete}>Usuń</button>
                </span>
        </li>
    )
}


