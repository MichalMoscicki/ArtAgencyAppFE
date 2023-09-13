import React, {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {deleteContactById, getContactById, updateContactById} from "../../api/contacts";
import Institutions from "./Institutions/Institutions";
import ContactPeople from "./ContactPeople/ContactPeople";
import {confirmAlert} from "react-confirm-alert";
import Events from "../../containers/Contacts/Events/Events";
import "./ContactDetails.css"
import {blankRegex} from "../../appConstans/appConstans";


//todo: nie jestm pewien, jak zyć reduxa w tym kontekście

const ContactDetails = () => {
    const contactId = useParams().contactId;
    const navigate = useNavigate();
    const [contact, setContact] = useState({title: "", alreadyCooperated: false, institutions: [], events: [], contactPeople: []});
    const [titleFormVisible, setTitleFormVisible] = useState(false);
    const [title, setTitle] = useState(contact.title)
    const [cooperationFormVisible, setCooperationFormVisible] = useState(false);
    const [alreadyCooperated, setAlreadyCooperated] = useState(contact.alreadyCooperated)
    const titleInputRef = useRef(null);
    const [description, setDescription] = useState(false);

    const [descriptionFormVisible, setDescriptionFormVisible] = useState(false);
    const descriptionInputRef = useRef(null);

    const fetchData = async () => {
        let response = await getContactById(contactId);
        await setContact(response)
        setTitle(response.title)
        setAlreadyCooperated(response.alreadyCooperated)
        if (response.description === null) {
            setDescription("Brak opisu")
        } else {
            setDescription(response.description)
        }
    }
    useEffect(() => {
        fetchData()

    }, []);

    useEffect(() => {
        if (titleFormVisible && titleInputRef.current) {
            titleInputRef.current.focus();
        }
        if (descriptionFormVisible && descriptionInputRef.current) {
            descriptionInputRef.current.focus();
        }
    }, [titleFormVisible, descriptionFormVisible]);

    const handleTitleClick = () => {
        setTitleFormVisible(!titleFormVisible)
    }
    const handleTitleOnBlur = async () => {
        if(blankRegex.test(title)){
            setTitle(contact.title)
        } else {
            const updatedContact = {...contact, title: title, alreadyCooperated: alreadyCooperated};
            const response = await updateContactById(contact.id, updatedContact);
            await setContact(response);
        }
        setTitleFormVisible(!titleFormVisible)
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
        const filteredInstitutions = contact.institutions.filter(institution => institution.id !== id);
        const updatedContact = {...contact, institutions: filteredInstitutions};
        setContact(updatedContact)
    }

    const onAddEvent= (event) => {
        const updatedContact = {...contact, events: [...contact.events, event]};
        setContact(updatedContact)
    }
    const onDeleteEvent = (id) => {
        const filteredEvents = contact.events.filter(event => event.id !== id);
        const updatedContact = {...contact, events: filteredEvents};
        setContact(updatedContact)

    }

    const onAddContactPerson= (contactPerson) => {
        const updatedContact = {...contact, contactPeople: [...contact.contactPeople, contactPerson]};
        setContact(updatedContact)
    }
    const onDeleteContactPerson = (id) => {
        const filteredPeople = contact.contactPeople.filter(contactPerson => contactPerson.id !== id);
        const updatedContact = {...contact, contactPeople: filteredPeople};
        setContact(updatedContact)

    }




    const toggleDescription = async () => {
        if (descriptionFormVisible && description === "") {
            setDescription("Brak opisu")
        }
        if (descriptionFormVisible && description !== "") {
            const updatedContact = {
                ...contact,
                title: title,
                alreadyCooperated: alreadyCooperated,
                description: description
            };
            const response = await updateContactById(contact.id, updatedContact);
            await setContact(response);
        }
        setDescriptionFormVisible(!descriptionFormVisible)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div className={"contact-details-container"}>
            <div>
                <div className={"contact-details-title-background"}>

                    <span className={"contact-details-title-span"}>
                        {titleFormVisible ?
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

                                <div className={"contact-details-already-cooperated-choice"}
                                     onClick={() => handleCooperationChoice(false)}>
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
                         <button onClick={handleDelete}>Usuń</button>
                         <h6>Ostatnia aktualizacja: {contact.updated}</h6>
                    </span>

                </div>
                <div className={"contact-details-description"}>
                    {descriptionFormVisible ? <textarea onBlur={toggleDescription} ref={descriptionInputRef}
                                                        onChange={handleDescriptionChange}
                                                        value={description}/>
                        :
                        <p onClick={toggleDescription}>{description}</p>}

                </div>
            </div>

            <div className={"contact-details-body"}>
                <Institutions institutions={contact.institutions}
                              onAddInstitution={onAddInstitution}
                              contactId={contactId} onDeleteInstitution={onDeleteInstitution}/>
                <ContactPeople contactPeople={contact.contactPeople} contactId={contactId} onAddContactPerson={onAddContactPerson} onDeleteContactPerson={onDeleteContactPerson}/>
                <Events events={contact.events} contactId={contactId} onAddEvent={onAddEvent} onDeleteEvent={onDeleteEvent}/>
            </div>

        </div>
    )
}

export default ContactDetails
