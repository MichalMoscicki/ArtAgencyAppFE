import React from "react";
import {useState, useEffect} from "react";
import {addContact, getContacts} from "../../api/contacts";
import Contact from "./Contact";


//todo pojedynczy kontakt (update, delete również, dodawanie instytucji, osób kontaktowych i eventów)
//todo Nowy Component - kontaktoverwiew i tam te wszystkie bajery
//todo okno z potwierdzeniem usuwania - obczaj confirmComponent

const Contacts = () => {
    let [contacts, setContacts] = useState([]);
    let [contactName, setContactName] = useState("");
    let [alreadyCooperated, setAlreadyCooperated] = useState(false);

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

    return (
        <div className="container">
            <h1>Kontakty</h1>
            <ul className="contactList">
                {contacts.map((el, index) => {
                    return (<Contact contact={el} onDelete={removeLocalStateContact} key={index}/>)
                })}
            </ul>
            <form onSubmit={onSubmit}>
                <h6>Dodaj kontakt</h6>
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