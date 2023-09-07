import React from "react";
import {useState, useEffect} from "react";
import {addContact, getContacts} from "../../api/contacts";
import SingleContact from "./SingleContact";
import "./Contacts.css"

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [contactName, setContactName] = useState("");
    const [alreadyCooperated, setAlreadyCooperated] = useState(false);
    const [formHidden, setFormHidden] = useState(true);

    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        let response = await getContacts();
        await setContacts(response)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const contact = {title : contactName, alreadyCooperated:alreadyCooperated}
        let response = await addContact(contact);
        setContacts( prevState => [...prevState, response]);
        setContactName("");
        setFormHidden(!formHidden);
    }
    const onChange = (e) => {
        setContactName(e.target.value)
    }
    const onCheck = () => {
        setAlreadyCooperated(!alreadyCooperated)
    }
    const removeLocalStateContact = (id) => {
        setContacts( prevState => [...prevState].filter(contact => contact.id !== id))
    }
    const toggleForm = () => {
        setFormHidden(!formHidden)
    }

    return (
        <div className="contacts-container">
            <h1>Kontakty</h1>
            <ul className={"contacts-list"}>
                {contacts.map((el, index) => {
                    return (<SingleContact contact={el} onDelete={removeLocalStateContact} key={index}/>)
                })}
            </ul>
            <h3 onClick={toggleForm} className={"add-contact"}>Dodaj kontakt</h3>
            <form onSubmit={onSubmit} hidden={formHidden}>
                <ul className={"contacts-form-list"}>
                    <li><input onChange={onChange} placeholder={"Nazwa kontaktu"} value={contactName}/></li>
                    <li>Czy już współpracowaliśmy<input type="checkbox" onChange={onCheck}/></li>
                </ul>
                <div className={"submit-contact-btn"}>
                    <button type={"submit"} disabled={!contactName}>Dodaj</button>
                </div>
                </form>

        </div>
    )
}

export default Contacts;