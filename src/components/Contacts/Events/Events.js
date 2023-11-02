import React, {useEffect, useState} from "react"
import {blankRegex, getCurrentTimeAndDate} from "../../../appConstans/appConstans";
import {addEvent} from "../../../api/events";
import SingleEvent from "../../../containers/Contacts/Events/SingleEvent";

const Events = ({contacts, updateContact, contactId, auth}) => {

    let contact = contacts.find(contact => contact.id === contactId);
    let events = contact.events === null ? [] : contact.events;

    const [formHidden, setFormHidden] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [monthWhenOrganized, setMonthWhenOrganized] = useState("");

    const toggleForm = () => {
        setFormHidden(!formHidden);
    }
    const checkButton = () => {
        if (blankRegex.test(name) || monthWhenOrganized === "") {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }

    const createUpdatedContact = (event) => {
        return {...contact, events: [...contact.events, event], updated: getCurrentTimeAndDate()}
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = {name: name, description: description, monthWhenOrganized: Number(monthWhenOrganized)}

        try {
            const response = await addEvent(contactId, event, auth);
            const updatedContact = await createUpdatedContact(response, auth);
            await updateContact(updatedContact);
            setName("");
            setDescription("");
            setMonthWhenOrganized("");

        } catch (Error) {
            console.log("Trzeba jakoś obsłużyć potencjalny błąd")
        }

        setFormHidden(!formHidden);
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleNotesChange = (e) => {
        setDescription(e.target.value)
    }
    const handleSelect = (e) => {
        setMonthWhenOrganized(e.target.value)
    }

    useEffect(() => {
        checkButton()
    }, [name, monthWhenOrganized])


    return (
        <span className={"cd-children-container"}>
            <h3 className={"cd-children-header"}>Wydarzenia:</h3>
            <ul className={"cd-children-list"}>
                {events.map((el, index) => {
                   return <SingleEvent eventId={el.id} key={index} index={index} contactId={contactId}/>
                })}
            </ul>
            <div className={"cd-add-children-container"}>
                <h6 onClick={toggleForm} className={"cd-add-children-title"}>Dodaj wydarzenie</h6>
                <form hidden={formHidden} onSubmit={handleSubmit}>
                    <ul className={"cd-children-list"}>
                        <li><input type={"text"} placeholder={"Nazwa"} value={name} onChange={handleNameChange}/></li>
                        <li><textarea placeholder={"Notatki"} value={description}
                                      onChange={handleNotesChange}/></li>
                        <li><select value={monthWhenOrganized} onChange={handleSelect}>
                            <option value="" disabled hidden>Kiedy organizowany</option>
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
                        </select></li>
                    </ul>
                    <button type={"submit"} disabled={buttonDisabled}>Dodaj</button>
                </form>
            </div>
        </span>
    )
}
export default Events;