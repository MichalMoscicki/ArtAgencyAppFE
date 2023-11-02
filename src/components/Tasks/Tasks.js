import React, {useEffect, useState} from "react";
import {addTask, getTasksSubsequentRequest} from "../../api/tasks";
import {isFieldEmptyNullOrUndefined} from "../../appConstans/appConstans";
import {WrongDatePopup} from "./WrongDatePopup";
import SingleTask from "../../containers/Tasks/SingleTask";
import {SORT_BY_TITLE, SORT_BY_UPDATED, SORT_DIR_ASC, SORT_DIR_DESC} from "../../api/constans";
import "./Tasks.css"

const Tasks = ({tasks, pagination, addTasksToState, addTaskToState, addPagination, auth}) => {
    const [formHidden, setFormHidden] = useState(true);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [active, setActive] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [activationDate, setActivationDate] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [status, setStatus] = useState("&sortBy=priority&sortDir=DESC&status=active");
    const [pageNo, setPageNo] = useState(0);

    const toggleForm = () => {
        setFormHidden(!formHidden)
    }
    const handleTitleChange = (e) => {
        setTaskTitle(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handlePriorityChange = (e) => {
        setPriority(e.target.value)
    }
    const onCheck = () => {
        setActive(!active);
        setActivationDate("")
    }
    const handleActivationDate = (e) => {
        const isDateInFuture = (date) => {
            const currentDate = new Date();
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            return date > currentDate;
        }
        if (isDateInFuture(e.target.value)) {
            setActivationDate(e.target.value)
        } else {
            setPopupVisible(true)
        }
    }

    useEffect(() => {
        const checkButton = () => {
            if (priority === "" || isFieldEmptyNullOrUndefined(taskTitle)) {
                setButtonDisabled(true)
            } else {
                setButtonDisabled(false)
            }
        }
        checkButton()
    }, [taskTitle, priority])

    const onSubmit = async (e) => {
        e.preventDefault();
        const task = {
            title: taskTitle,
            description: description,
            priority: Number(priority),
            active: active,
            activationDate: activationDate
        };
        let response = await addTask(task, auth);
        await addTaskToState(response);

        setFormHidden(true);
        setTaskTitle("");
        setDescription("")
        setPriority("");
        setActive(false)
        setActivationDate("")
    }

    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

    const handlePageButton = (index) => {
        setPageNo(index)
    }
    useEffect(() => {
        const checkButtons = () => {
            if (pagination.pageNo === 0) {
                setPrevButtonDisabled(true)
            } else {
                setPrevButtonDisabled(false)
            }

            if (pagination.last) {
                setNextButtonDisabled(true)
            } else {
                setNextButtonDisabled(false)
            }
        }
        checkButtons()
    }, [pagination])

    const generatePagesButtons = () => {
        let buttons = [];
        for (let i = 0; i < pagination.totalPages; i++) {
            buttons = [...buttons, <button key={i} onClick={() => handlePageButton(i)}>{i}</button>]
        }
        return buttons;
    }

    const FINISHED = "FINISHED";
    const ACTIVE = "ACTIVE";
    const INCOMING = "INCOMING";
    const ALL = "ALL";

    const handleSelect = (e) => {

        switch (e.target.value) {
            case ACTIVE:
                setStatus("&sortBy=priority&sortDir=DESC&status=active");
                break
            case FINISHED:
                setStatus("&sortBy=updated&sortDir=DESC&status=finished");
                break
            case INCOMING:
                setStatus("&sortBy=activationDate&sortDir=ASC&status=future");
                break
            case ALL:
                setStatus("");
            default:
                return
        }
    }
    useEffect(() => {
        const fetchSubsequentData = async () => {
            let response = await getTasksSubsequentRequest(pageNo, status, auth);
            await addTasksToState(response.content);
            await addPagination({
                pageNo: response.pageNo,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last
            })
        }

        fetchSubsequentData()
    }, [status, pageNo])

    return (
        <div className={"tasks-container"}>
            <div className={"tasks-header"}>
                <h1>Zadania</h1>
                <span>
                    <select onChange={handleSelect}>
                        <option value={ACTIVE}>Bieżące</option>
                        <option value={INCOMING}>Nadchodzące</option>
                        <option value={FINISHED}>Ukończone</option>
                        <option value={ALL}>Wszystkie</option>
                    </select>
                </span>
            </div>
            <ul>
                {tasks.map((el, index) => {
                    return (<SingleTask key={index} task={el}/>)
                })}
            </ul>

            <div className={"tasks-footer"}>
                <span>
                     <h3 onClick={toggleForm}>Dodaj zadanie</h3>
                </span>
                <span>
                    <ul>
                        <li>
                            <button onClick={() => handlePageButton(pagination.pageNo - 1)}
                                    disabled={prevButtonDisabled}>poprzednia</button>
                        </li>
                        <li>
                            {generatePagesButtons()}
                        </li>
                        <li>
                            <button onClick={() => handlePageButton(pagination.pageNo + 1)}
                                    disabled={nextButtonDisabled}>kolejna</button>
                        </li>
                    </ul>
                </span>
            </div>

            <form onSubmit={onSubmit} hidden={formHidden}>
                <ul className={"contacts-form-list"}>
                    <li>
                        <label htmlFor={"task-title"}>Tytuł zadania: </label>
                        <input onChange={handleTitleChange} placeholder={"Wpisz tytuł"} value={taskTitle}
                               id={"task-title"}/>
                    </li>

                    <li>
                        <label htmlFor="description">Opis zadania: </label>
                        <textarea id={"description"} value={description} onChange={handleDescriptionChange}
                                  placeholder={"Dodaj opis"}/>
                    </li>

                    <li>
                        <label htmlFor={"priority"}>Nadaj priorytet: </label>
                        <select onChange={handlePriorityChange} value={priority} id={"priority"}>
                            <option value="">Wybierz priorytet</option>
                            <option value="1">Niski</option>
                            <option value="2">Średni</option>
                            <option value="3">Wysoki</option>
                        </select>
                    </li>

                    <li>
                        <label htmlFor={"active"}>Aktywne: </label>
                        <input type="checkbox" onChange={onCheck} id={"active"} checked={active}/>
                    </li>

                    <li hidden={active}>
                        <label htmlFor={"activation-date"}>Zaplanuj aktywację:</label>
                        <input type={"date"} id={"activation-date"} onChange={handleActivationDate}
                               value={activationDate}/>
                        {popupVisible && <WrongDatePopup setPopupVisible={setPopupVisible}/>}
                    </li>
                </ul>
                <div className={"submit-contact-btn"}>
                    <button type={"submit"} disabled={buttonDisabled}>Dodaj</button>
                </div>
            </form>

        </div>

    )
}
export default Tasks;