import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import "../ContactDetailsChildren.css"
import {blankRegex, isFieldEmptyNullOrUndefined, getCurrentTimeAndDate} from "../../../appConstans/appConstans";
import {updateEventById, deleteEventById} from "../../../api/events";
import {displayMonth} from "../../../appUtils/appUtils";

const SingleEvent = ({eventId, contactId, updateContact, contacts, index}) => {

    let contact = contacts.find(contact => contact.id === contactId);
    const event = contact.events.find(event => event.id === eventId);

    const updateState = (updatedEvent) => {
        const updatedEvents = [...contact.events]
        updatedEvents[index] = updatedEvent;
        const updatedContact = {...contact, events: updatedEvents, updated: getCurrentTimeAndDate()
        }
        updateContact(updatedContact)
    }

    const [listHidden, setListHidden] = useState(true);
    const handleDeleteButton = () => {
        confirmAlert({
            title: 'Usuwanie instytucji',
            message: 'Czy na pewno?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteEventById(contactId, eventId);
                        const updatedContact = {...contact, events: contact.events.filter(event => event.id !== eventId)}
                        updateContact(updatedContact)
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    }
    const handleDetailsButton = () => {
        setListHidden(!listHidden)
    }

    const [name, setName] = useState(event.name);
    const [eventFormVisible, setEventFormVisible] = useState(false)
    const nameInputRef = useRef(null);
    const toggleNameForm = async () => {
        if (eventFormVisible === true && name !== event.name) {
            if (blankRegex.test(name)) {
                setName(event.name)
            } else {
                try {
                    let updatedEvent = {...event, name: name}
                    await updateEventById(contactId, updatedEvent)
                    updateState(updatedEvent)
                } catch (Error) {
                    console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                }
            }
        }
        setEventFormVisible(!eventFormVisible)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }


    const [description, setDescription] = useState(event.description);
    const [descriptionFormVisible, setDescriptionFormVisible] = useState(false)
    const descriptionInputRef = useRef(null);
    const displayDescription = () => {
        if(isFieldEmptyNullOrUndefined(event.description)){
            return "Brak opisu"
        }
        return event.description;
    }
    const toggleDescriptionForm = async () => {
        if (descriptionFormVisible === true && description !== event.description) {
                    try {
                        let updatedEvent = {...event, description: description}
                        await updateEventById(contactId, updatedEvent)
                        console.log(updatedEvent)
                        updateState(updatedEvent)
                    } catch (Error) {
                        console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                    }
        }
        setDescriptionFormVisible(!descriptionFormVisible);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const [monthWhenOrganized, setMonthWhenOrganized] = useState(event.monthWhenOrganized);
    const [monthFormVisible, setMonthFormVisible] = useState(false)
    const toggleMonthForm = async () => {
        setMonthFormVisible(!monthFormVisible)
    }
    const handleSelect = async (e) => {
        setMonthWhenOrganized(e.target.value)
        try {
            let updatedEvent = {...event, monthWhenOrganized: e.target.value}
            await updateEventById(contactId, updatedEvent)
            await updateState(updatedEvent)
        } catch (Error) {
            console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
        }
        setMonthFormVisible(!monthFormVisible)
    }

    useEffect(() => {
            if (eventFormVisible && nameInputRef.current) {
                nameInputRef.current.focus();
            }
            if (descriptionFormVisible && descriptionInputRef.current) {
                descriptionInputRef.current.focus();
            }
        },
        [eventFormVisible, descriptionFormVisible]);


    return (
        <li className={"cd-children-li"}>
            <div className={"cd-children-name-container"}>
                <span className={"cd-children-span"}>
                    {eventFormVisible ?
                        <input type={"text"} ref={nameInputRef} value={name} onChange={handleNameChange}
                               onBlur={toggleNameForm}/>
                        :
                        <h6 onClick={toggleNameForm} className={"cd-children-name"}>{name}</h6>}
                </span>

                <span>
                    <button onClick={handleDetailsButton}>Szczegóły</button>
                    <button onClick={handleDeleteButton}>Usuń</button>
                </span>

            </div>

            <div hidden={listHidden}>
                <ul className={"cd-children-details-container"}>
                    <li>{descriptionFormVisible ?
                        <textarea ref={descriptionInputRef} onChange={handleDescriptionChange} value={description}
                                  onBlur={toggleDescriptionForm}/>
                        :
                        <div hidden={descriptionFormVisible} onClick={toggleDescriptionForm}>{displayDescription()}</div>}
                    </li>
                    <li>{monthFormVisible ?
                               <select defaultValue={monthWhenOrganized} onChange={handleSelect}>
                                    <option value="1">Styczeń</option>
                                    <option value="2">Luty</option>
                                    <option value="3">Marzec</option>
                                    <option value="4">Kwiecień</option>
                                    <option value="5">Maj</option>
                                    <option value="6">Czerwiec</option>
                                    <option value="7">Lipiec</option>
                                    <option value="8">Sierpień</option>
                                    <option value="9">Wrzesień</option>
                                    <option value="10">Październik</option>
                                    <option value="11">Listopad</option>
                                    <option value="12">Grudzień</option>
                                </select>
                    :
                        <div hidden={monthFormVisible} onClick={toggleMonthForm}>{displayMonth(monthWhenOrganized)}</div>
                    }</li>
                </ul>
            </div>
        </li>
    )
}

export default SingleEvent