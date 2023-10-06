import React, {useEffect, useState} from "react";
import {addTask, getTasksInitialRequest} from "../../api/tasks";
import SingleContact from "../../containers/Contacts/SingleContact";
import {isFieldEmptyNullOrUndefined} from "../../appConstans/appConstans";
import {WrongDatePopup} from "./WrongDatePopup";

const Tasks = ({tasks, addTasksToState, addTaskToState}) => {

    useEffect(() => {
        const fetchInitialData = async () => {
            let response = await getTasksInitialRequest();
            await addTasksToState(response.content);
            // await addPagination({
            //     pageNo: response.pageNo,
            //     pageSize: response.pageSize,
            //     totalElements: response.totalElements,
            //     totalPages: response.totalPages,
            //     last: response.last
            // })
        }

        if (tasks.length === 0) {
            fetchInitialData()
        }
    }, []);

    const [formHidden, setFormHidden] = useState(true)
    const toggleForm = () => {
        setFormHidden(!formHidden)
    }

    const [taskTitle, setTaskTitle] = useState("")
    const onChange = (e) => {
        setTaskTitle(e.target.value)
    }

    const [description, setDescription] = useState("")
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const [priority, setPriority] = useState("");
    const onSelectChange = (e) => {
        setPriority(e.target.value)
    }

    const [active, setActive] = useState(false)
    const onCheck = () => {
        setActive(!active);
        setActivationDate("")
    }


    const [popupVisible, setPopupVisible] = useState(false);
    const [activationDate, setActivationDate] = useState("");
    const handleActivationDate = (e) => {
        const isDateInFuture = (date) => {
            const currentDate = new Date();
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            return date > currentDate;
        }

        if(isDateInFuture(e.target.value)){
            setActivationDate(e.target.value)
        } else {
            setPopupVisible(true)
        }
    }


    const [buttonDisabled, setButtonDisabled] = useState(true);
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
        const task = {title: taskTitle, description: description, priority: Number(priority), active: active, activationDate: activationDate};
        let response = await addTask(task);
        await addTaskToState(response);
        function restartFields() {
            setFormHidden(true);
            setTaskTitle("");
            setDescription("")
            setPriority("");
            setActive(false)
            setActivationDate("")
        }
        restartFields();
    }

    return (
        <div>
            <h1>Tasks</h1>
            <ul className={"contacts-list"}>
                {tasks.map((el, index) => {
                    return (el.title)
                })}
            </ul>

            <div className={"contacts-container-footer"}>
                <span>
                     <h3 onClick={toggleForm} className={"add-contact"}>Dodaj zadanie</h3>
                </span>
                <span>
                    <ul>
                {/*<li>*/}
                        {/*    <button onClick={() => handlePageButton(pagination.pageNo - 1)}*/}
                        {/*            disabled={prevButtonDisabled}>poprzednia</button>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    {generatePagesButtons()}*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <button onClick={() => handlePageButton(pagination.pageNo + 1)}*/}
                        {/*            disabled={nextButtonDisabled}>kolejna</button>*/}
                        {/*</li>*/}
            </ul>
                </span>
            </div>

            <form onSubmit={onSubmit} hidden={formHidden}>

                <ul className={"contacts-form-list"}>

                    <li>
                        <label htmlFor={"task-title"}>Tytuł zadania: </label>
                        <input onChange={onChange} placeholder={"Wpisz tytuł"} value={taskTitle} id={"task-title"}/>
                    </li>

                    <li>
                        <label htmlFor="description">Opis zadania: </label>
                        <textarea id={"description"} value={description} onChange={handleDescriptionChange} placeholder={"Dodaj opis"}/>
                    </li>

                    <li>
                        <label htmlFor={"priority"}>Nadaj priorytet: </label>
                        <select onChange={onSelectChange} value={priority} id={"priority"}>
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
                        <input type={"date"} id={"activation-date"} onChange={handleActivationDate} value={activationDate}/>
                        {popupVisible && <WrongDatePopup setPopupVisible={setPopupVisible}/>}
                    </li>

                    <li>{/*taskAttachments*/}</li>
                </ul>
                <div className={"submit-contact-btn"}>
                    <button type={"submit"} disabled={buttonDisabled}>Dodaj</button>
                </div>
            </form>

        </div>

    )
}
export default Tasks;