import React, {useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {deleteContactById, getContactById, updateContactById} from "../../api/contacts";
import Institutions from "../../containers/Contacts/Institutions/Institutions";
import ContactPeople from "../../containers/Contacts/ContactPeople/ContactPeople"
import {confirmAlert} from "react-confirm-alert";
import Events from "../../containers/Contacts/Events/Events";
import "./ContactDetails.css"
import {blankRegex, isFieldEmptyNullOrUndefined} from "../../appConstans/appConstans";

const ContactDetails = ({contacts, updateContact, removeContact, auth}) => {
    const contactId = Number(useParams().contactId);
    let contact = contacts.find(contact => contact.id === contactId);
    const navigate = useNavigate();
    const [titleFormVisible, setTitleFormVisible] = useState(false);
    const [title, setTitle] = useState(contact.title)
    const titleInputRef = useRef(null);
    const [cooperationFormVisible, setCooperationFormVisible] = useState(false);
    const [description, setDescription] = useState(contact.description);
    const [descriptionFormVisible, setDescriptionFormVisible] = useState(false);
    const descriptionInputRef = useRef(null);

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
       const updatedContact = {...contact, title: title};
       const response = await updateContactById(contactId, updatedContact, auth);
       await updateContact(response);
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
        const updatedContact = {...contact, alreadyCooperated: value};
        const response = await updateContactById(contact.id, updatedContact, auth);
        await updateContact(response);
        setCooperationFormVisible(!cooperationFormVisible);
    }
    const handleReturn = () => {
        navigate(`/contacts`)
    }

    const displayDescription = () => {
        if(isFieldEmptyNullOrUndefined(contact.description)){
            return "Brak opisu"
        }
        return contact.description;
    }
    const toggleDescription = async () => {
        if (descriptionFormVisible && description !== contact.description) {
            const updatedContact = {...contact, description: description};
            const response = await updateContactById(contact.id, updatedContact, auth);
            await updateContact(response);
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
                                contact.alreadyCooperated ? "Już współpracowaliśmy" : "Nie współpracowaliśmy"}
                            </h6>
                        }
                    </span>

                    <span className={"contact-details-delete-button-span"}>
                         <button onClick={handleReturn}>Powrót</button>
                         <h6>Ostatnia aktualizacja: {contact.updated}</h6>
                    </span>

                </div>
                <div className={"contact-details-description"}>
                    {descriptionFormVisible ? <textarea onBlur={toggleDescription} ref={descriptionInputRef}
                                                        onChange={handleDescriptionChange}
                                                        value={description}/>
                        :
                        <p onClick={toggleDescription}>{displayDescription()}</p>}
                </div>
            </div>

            <div className={"contact-details-body"}>
                <Institutions contactId={contactId}/>
                <Events contactId={contactId}/>
                <ContactPeople contactId={contactId}/>
            </div>

        </div>
    )
}

export default ContactDetails
