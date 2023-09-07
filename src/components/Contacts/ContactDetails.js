import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {deleteContactById, getContactById, updateContactById} from "../../api/contacts";
import Institutions from "./Institutions/Institutions";
import ContactPeople from "./ContactPeople/ContactPeople";
import {confirmAlert} from "react-confirm-alert";
import Events from "../../containers/Events";


const ContactDetails = () => {
    const contactId = useParams().contactId;
    const navigate = useNavigate();
    const [contact, setContact] = useState({title: "", alreadyCooperated: false, institutions:[]});
    const [formHidden, setFormHidden] = useState(true);
    const [title, setTitle] = useState(contact.title)
    const [alreadyCooperated, setAlreadyCooperated] = useState(contact.alreadyCooperated)

    const fetchData = async () => {
        let response = await getContactById(contactId);
        await setContact(response)
        setTitle(response.title)
        setAlreadyCooperated(response.alreadyCooperated)
    }
    useEffect(() => {
        fetchData()
    }, []);
    const toggleForm = () => {
        setFormHidden(!formHidden)
    }
    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }
    const handleCheckboxChange = () => {
        setAlreadyCooperated(!alreadyCooperated)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedContact = {...contact, title: title, alreadyCooperated: alreadyCooperated};
        const response = await updateContactById(contact.id, updatedContact);
        await setContact(response);
        setFormHidden(!formHidden);
    }
    const handleDelete = () => {
        confirmAlert({
            title: 'Usuwanie kontaktu',
            message: 'Usuwając kontakt, usuniesz wszystkie powiązane dane',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteContactById(contact.id);
                        navigate(`/contacts`)
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
    const onAddInstitution = (institution) => {

        const updatedContact = {...contact, institutions:[...contact.institutions, institution]};
        setContact(updatedContact)
    }
    const onDeleteInstitution = (id) => {
        const filteredInstitution = contact.institutions.filter( institution => institution.id !== id);
        const updatedContact = {...contact, institutions:filteredInstitution};
        setContact(updatedContact)
    }

    return (
        <div>
            <div>
                <h1>{contact.title}</h1>
                <h6>{contact.alreadyCooperated ? "Już współpracowaliśmy" : "Nie współpracowaliśmy"}</h6>
                <h5>Możliwe, że będzie potrzbe dodać opis</h5>
                <button onClick={() => toggleForm()}>Edytuj</button>
                <form hidden={formHidden} onSubmit={handleSubmit}>
                    <ul>
                        <li><input type={"text"} onChange={handleInputChange} value={title}/></li>
                        <li>Już współpracowaliśmy: <input type={"checkbox"} checked={alreadyCooperated}
                                                          onChange={handleCheckboxChange}/></li>
                        <li>
                            <button type={"submit"}>Zapisz zmiany</button>
                        </li>
                    </ul>
                </form>
                <br/>
                <button onClick={handleDelete}>Usuń</button>
            </div>
            <h6>----------------</h6>
            <Institutions institutions={contact.institutions}
                          onAddInstitution={onAddInstitution}
                          contactId={contactId} onDeleteInstitution={onDeleteInstitution}/>
            <h6>----------------</h6>
            <ContactPeople/>
            <h6>----------------</h6>
            <Events/>
            <h6>----------------</h6>
            <button>Powrót</button>


        </div>
    )
}

export default ContactDetails
