import React, {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {deleteContactById, getContactById, updateContactById} from "../../api/contacts";
import Institutions from "./Institutions/Institutions";
import ContactPeople from "./ContactPeople/ContactPeople";
import {confirmAlert} from "react-confirm-alert";
import Events from "../../containers/Contacts/Events/Events";
import "./ContactDetails.css"


//todo: nie jestm pewien, jak zyć reduxa w tym kontekście

const ContactDetails = () => {
    const contactId = useParams().contactId;
    const navigate = useNavigate();
    const [contact, setContact] = useState({title: "", alreadyCooperated: false, institutions: []});
    const [formVisible, setFormVisible] = useState(false);
    const [title, setTitle] = useState(contact.title)
    const [cooperationFormVisible, setCooperationFormVisible] = useState(false);
    const [alreadyCooperated, setAlreadyCooperated] = useState(contact.alreadyCooperated)
    const titleInputRef = useRef(null);

    const fetchData = async () => {
        let response = await getContactById(contactId);
        await setContact(response)
        setTitle(response.title)
        setAlreadyCooperated(response.alreadyCooperated)
    }
    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (formVisible && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [formVisible]);

    const handleTitleClick = () => {
        setFormVisible(!formVisible)
    }
    const handleTitleOnBlur = async () => {
        const updatedContact = {...contact, title: title, alreadyCooperated: alreadyCooperated};
        const response = await updateContactById(contact.id, updatedContact);
        await setContact(response);
        setFormVisible(!formVisible)
    }
    const handleInputChange = (e) => {
        setTitle(e.target.value)
    }
    const toggleAlreadyCooperated = () => {
        setCooperationFormVisible(!cooperationFormVisible)
    }
    const handleCooperationChoice = async (value) => {
        const updatedContact = {...contact, title: title, alreadyCooperated: value};
        const response = await updateContactById(contact.id, updatedContact);
        await setContact(response);
        setCooperationFormVisible(!cooperationFormVisible);
        setAlreadyCooperated(value);
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

        const updatedContact = {...contact, institutions: [...contact.institutions, institution]};
        setContact(updatedContact)
    }
    const onDeleteInstitution = (id) => {
        const filteredInstitution = contact.institutions.filter(institution => institution.id !== id);
        const updatedContact = {...contact, institutions: filteredInstitution};
        setContact(updatedContact)
    }

    return (
        <div className={"contact-details-container"}>
            <div>
                <div className={"contact-details-title-background"}>

                    <span className={"contact-details-title-span"}>
                        {formVisible ?
                            <input type={"text"} onChange={handleInputChange} value={title} ref={titleInputRef}
                                   onBlur={handleTitleOnBlur}/>
                            :
                            <h1 onClick={handleTitleClick}>{contact.title}</h1>
                        }

                        {cooperationFormVisible ?
                                <div style={{display: "flex"}}>
                                    <div className={"contact-details-already-cooperated-choice"}
                                         onClick={() => handleCooperationChoice(true)}>
                                        <h6>{
                                            "Już współpracowaliśmy"}
                                        </h6>
                                    </div>

                                    <div className={"contact-details-already-cooperated-choice"} onClick={() => handleCooperationChoice(false)}>
                                        <h6>{"Nie współpracowaliśmy"}
                                        </h6>
                                    </div>

                            </div>
                            :
                            <h6 className={"contact-details-already-cooperated"} onClick={toggleAlreadyCooperated}>{
                            alreadyCooperated ? "Już współpracowaliśmy" : "Nie współpracowaliśmy"}
                            </h6>
                        }
                    </span>

                    <span className={"contact-details-delete-button-span"}>
                         <button onClick={handleDelete}>Usuń</button></span>
                </div>
                <div className={"contact-details-description"}>
                    <h5>Możliwe, że będzie potrzbe dodać opis</h5>
                </div>
            </div>

            <div className={"contact-details-body"}>
                    <Institutions institutions={contact.institutions}
                                  onAddInstitution={onAddInstitution}
                                  contactId={contactId} onDeleteInstitution={onDeleteInstitution}/>
                    <ContactPeople/>
                    <Events/>
            </div>

        </div>
    )
}

export default ContactDetails
