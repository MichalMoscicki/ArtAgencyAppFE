import React from "react";
import {useState, useEffect} from "react";
import {addContact, getContacts} from "../../api/contacts";
import SingleContact from "./SingleContact";

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
        <div className="container">
            <h1>Kontakty</h1>
            <ul className="contactList">
                {contacts.map((el, index) => {
                    return (<SingleContact contact={el} onDelete={removeLocalStateContact} key={index}/>)
                })}
            </ul>
            <h6 onClick={toggleForm}>Dodaj kontakt</h6>
            <form onSubmit={onSubmit} hidden={formHidden}>
                <ul>
                    <li><input onChange={onChange} placeholder={"Nazwa kontaktu"} value={contactName}/></li>
                    <li>Czy już współpracowaliśmy<input type="checkbox" onChange={onCheck}/></li>
                </ul>
                <button type={"submit"} disabled={!contactName}>Dodaj</button>
            </form>

        </div>
    )
}

export default Contacts;