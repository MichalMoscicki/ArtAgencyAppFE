import React, {useState} from "react";
import {deleteTaskById, updateTaskById} from "../../api/tasks";
import "./SingleTask.css"
import {displayPriority} from "../../appUtils/appUtils";


export const SingleTask = ({task, updateTaskInState, removeTaskFromState, auth}) => {

    const [detailsHidden, setDetailsHidden] = useState(true);
    const toggleDetails = () => {
        setDetailsHidden(!detailsHidden);
    }

    const handleDelete = () => {
        deleteTaskById(task.id, auth)
        removeTaskFromState(task);
    }
    const handleCompleted = async () => {
        const updatedTask = {...task, finished: true, active:false};
        const response = await updateTaskById(updatedTask.id, updatedTask, auth)
        await updateTaskInState(response)
    }

    return (

        <li>
            <div className={"task"}  onClick={toggleDetails}>
                <span className={"task-title"}>{task.title}</span>
                <span>
                    <button onClick={handleDelete}>Usuń</button>
                </span>
            </div>
            <div hidden={detailsHidden} className={"task-details"}>
                <div className={"overlay"}>
                    <div className={"task-details-content"}>
                        <h3>{task.title}</h3>
                        <span>Aktualizacja: {task.updated}</span>
                        <p>{task.description}</p>

                        <p>{task.activationDate}</p>
                        <p>{task.active}</p>
                        <p>
                            dispay attachment

                        </p>
                        <div className={"task-details-footer"}>
                            <span>Priorytet: {displayPriority(task.priority)}</span>
                            <span>
                                {task.finished ? <img src="src/images/checked_709510.png" alt="Done"/>
                                    : <button onClick={handleCompleted}>Ukończ</button>}
                                <button onClick={toggleDetails  }>Zamknij</button>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}