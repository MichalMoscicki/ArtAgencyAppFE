import React, {useEffect, useState} from "react";
import {addTask, getTasksInitialRequest, getTasksSubsequentRequest} from "../../api/tasks";
import {isFieldEmptyNullOrUndefined} from "../../appConstans/appConstans";
import {WrongDatePopup} from "./WrongDatePopup";
import SingleTask from "../../containers/Tasks/SingleTask";
import {SORT_BY_TITLE, SORT_BY_UPDATED, SORT_DIR_ASC, SORT_DIR_DESC} from "../../api/constans";
import "./Tasks.css"
import {addAttachment} from "../../api/taskAttachments";

//todo Now only adding tasks from store is possible. Create component providing browsing all tasks from db.

const Tasks = ({tasks, pagination, addTasksToState, addTaskToState, addPagination, contacts}) => {
    useEffect(() => {
        const fetchInitialData = async () => {
            let response = await getTasksInitialRequest();
            await addTasksToState(response.content);
            await addPagination({
                pageNo: response.pageNo,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last
            })
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

    const [contactId, setContactId] = useState(null);
    const handleAttachment = (e) => {
        setContactId(e.target.value)
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

        if (isDateInFuture(e.target.value)) {
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
        const task = {
            title: taskTitle,
            description: description,
            priority: Number(priority),
            active: active,
            activationDate: activationDate
        };
        let response = await addTask(task);

        //todo jeśli kontakt jest nullem, nie dodawaj załącznika

        const contact = contacts.filter( (el) => el.id === Number(contactId))[0]
        const attachment = {contacts: [contact]}
        const attachmentResponse =  await addAttachment(response.id, attachment);

        const taskWithAttachment = {...response, attachment: attachmentResponse}
        await addTaskToState(taskWithAttachment);
        console.log(taskWithAttachment)

            setFormHidden(true);
            setTaskTitle("");
            setDescription("")
            setPriority("");
            setActive(false)
            setActivationDate("")
    }

    const [sortBy, setSortBy] = useState("");
    const [sortDir, setSortDir] = useState("");
    const [pageNo, setPageNo] = useState(0);

    const TITLE_ASC = "TITLE_ASC";
    const TITLE_DESC = "TITLE_DESC";
    const UPDATED_ASC = "UPDATED_ASC";
    const UPDATED_DESC = "UPDATED_DESC";

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

    const handleSelect = (e) => {

        switch (e.target.value) {
            case TITLE_DESC:
                setSortBy(SORT_BY_TITLE);
                setSortDir(SORT_DIR_DESC);
                break
            case TITLE_ASC:
                setSortBy(SORT_BY_TITLE);
                setSortDir(SORT_DIR_ASC);
                break
            case UPDATED_DESC:
                setSortBy(SORT_BY_UPDATED);
                setSortDir(SORT_DIR_DESC);
                break
            case UPDATED_ASC:
                setSortBy(SORT_BY_UPDATED);
                setSortDir(SORT_DIR_ASC);
                break
            default:
                return
        }
    }
    useEffect(() => {
        const fetchSubsequentData = async () => {
            let response = await getTasksSubsequentRequest(pageNo, sortBy, sortDir);
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
    }, [sortDir, sortBy, pageNo])

    return (
        <div className={"tasks-container"}>
            <div className={"tasks-header"}>
                <h1>Zadania</h1>
                <span>
                    <select onChange={handleSelect}>
                        <option value={UPDATED_DESC}>Data aktualizacji: od najnowszych</option>
                        <option value={UPDATED_ASC}>Data aktualizacji: od najstarszych</option>
                        <option value={TITLE_ASC}>Nazwa: rosnąco</option>
                        <option value={TITLE_DESC}>Nazwa: malejąco</option>
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
                        <input onChange={onChange} placeholder={"Wpisz tytuł"} value={taskTitle} id={"task-title"}/>
                    </li>

                    <li>
                        <label htmlFor="description">Opis zadania: </label>
                        <textarea id={"description"} value={description} onChange={handleDescriptionChange}
                                  placeholder={"Dodaj opis"}/>
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
                        <input type={"date"} id={"activation-date"} onChange={handleActivationDate}
                               value={activationDate}/>
                        {popupVisible && <WrongDatePopup setPopupVisible={setPopupVisible}/>}
                    </li>

                    <li>
                        <select onChange={handleAttachment}>
                            <option value={null}>załącz kontakt</option>
                            {contacts.map((el, index) => {
                                return (<option value={el.id} key={index}>{el.title}</option>)
                            })}
                        </select>
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