import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import {deleteInstitutionById, updateInstitutionById} from "../../../api/institutions";
import "../ContactDetailsChildren.css"
import {
    blankRegex,
    emailRegex,
    getCurrentTimeAndDate,
    isFieldEmptyNullOrUndefined, phoneRegex, wrongEmailMessage, wrongPhoneMessage
} from "../../../appConstans/appConstans";


const SingleInstitution = ({contactId, index, institutionId, updateContact, contacts, auth}) => {
    let contact = contacts.find(contact => contact.id === contactId);
    const institution = contact.institutions.find(institution => institution.id === institutionId);

    const [errors, setErrors] = useState([]);
    const [listHidden, setListHidden] = useState(true);
    const handleDeleteButton = () => {
        confirmAlert({
            title: 'Usuwanie instytucji',
            message: 'Czy na pewno?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteInstitutionById(contactId, institutionId, auth);
                        const updatedContact = {
                            ...contact,
                            institutions: contact.institutions.filter(institution => institution.id !== institutionId)
                        }
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

    const updateState = (updatedInstitution) => {
        const updatedInstitutions = [...contact.institutions]
        updatedInstitutions[index] = updatedInstitution;
        const updatedContact = {
            ...contact, institutions: updatedInstitutions, updated: getCurrentTimeAndDate()
        }
        updateContact(updatedContact)
    }


    const [name, setName] = useState(institution.name);
    const [nameFormVisible, setNameFormVisible] = useState(false)
    const nameInputRef = useRef(null);
    const toggleNameForm = async () => {
        if (nameFormVisible === true && name !== institution.name) {
            if (blankRegex.test(name)) {
                setName(institution.name)
            } else {
                try {
                    let updatedInstitution = {...institution, name: name}
                    const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                    updateState(response)
                } catch (Error) {
                    console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                }
            }
        }
        setNameFormVisible(!nameFormVisible)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }


    const [city, setCity] = useState(institution.city);
    const [cityFormVisible, setCityFormVisible] = useState(false)
    const cityInputRef = useRef(null);
    const toggleCityForm = async () => {
        if (cityFormVisible === true && city !== institution.city) {

            if (blankRegex.test(city)) {
                setCity(institution.city)
            } else {
                try {
                    let updatedInstitution = {...institution, city: city}
                    const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                    updateState(response)
                } catch (Error) {
                    console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                }
            }
        }
        setCityFormVisible(!cityFormVisible)
    }
    const handleCityChange = (e) => {
        setCity(e.target.value)
    }


    const [category, setCategory] = useState(institution.category);
    const [categoryFormVisible, setCategoryFormVisible] = useState(false)
    const categoryInputRef = useRef(null);
    const toggleCategoryForm = async () => {
        if (categoryFormVisible === true && category !== institution.category) {
            if (blankRegex.test(category)) {
                setCategory(institution.category)
            } else {
                try {
                    let updatedInstitution = {...institution, category: category}
                    const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                    updateState(response)
                } catch (Error) {
                    console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                }
            }
        }
        setCategoryFormVisible(!categoryFormVisible)
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }


    const [notes, setNotes] = useState(institution.notes);
    const [notesFormVisible, setNotesFormVisible] = useState(false)
    const notesInputRef = useRef(null);
    const toggleNotesForm = async () => {
        if (notesFormVisible === true && notes !== institution.notes) {
            try {
                let updatedInstitution = {...institution, notes: notes}
                const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                updateState(response)
            } catch (Error) {
                console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
            }
        }
        setNotesFormVisible(!notesFormVisible)
    }
    const handleNotesChange = (e) => {
        setNotes(e.target.value)
    }
    const displayNotes = () => {
        if (isFieldEmptyNullOrUndefined(institution.notes)) {
            return "Brak notatek"
        }
        return institution.notes;
    }


    const [email, setEmail] = useState(institution.email);
    const [emailFormVisible, setEmailFormVisible] = useState(false);
    const emailInputRef = useRef(null);
    const toggleEmailForm = async () => {
        setErrors([])
        if (emailFormVisible === true && email !== institution.email) {
            if (!emailRegex.test(email) && !isFieldEmptyNullOrUndefined(email)) {
                setErrors([wrongEmailMessage])
                return
            }
            try {
                let updatedInstitution = {...institution, email: email}
                const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                updateState(response)
            } catch (Error) {
                console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
            }
        }
        setEmailFormVisible(!emailFormVisible);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const displayEmail = () => {
        if (isFieldEmptyNullOrUndefined(institution.email)) {
            return "Brak emaila"
        }
        return institution.email;
    }


    const [phone, setPhone] = useState(institution.phone);
    const [phoneFormVisible, setPhoneFormVisible] = useState(false);
    const phoneInputRef = useRef(null);
    const togglePhoneForm = async () => {
        setErrors([])

        if (phoneFormVisible === true && phone !== institution.email) {
            if (!phoneRegex.test(phone) && !isFieldEmptyNullOrUndefined(phone)) {
                setErrors([wrongPhoneMessage])
                return
            }
            try {
                let updatedInstitution = {...institution, phone: phone}
                const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                updateState(response)
            } catch (Error) {
                console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
            }
        }
        setPhoneFormVisible(!phoneFormVisible);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const displayPhone = () => {
        if (isFieldEmptyNullOrUndefined(institution.phone)) {
            return "Brak telefonu"
        }
        return institution.phone;
    }


    const [webPage, setWebPage] = useState(institution.webPage);
    const [webPageFormVisible, setWebPageFormVisible] = useState(false);
    const webPageInputRef = useRef(null);
    const toggleWebPageForm = async () => {
        if (webPageFormVisible === true && webPage !== institution.webPage) {
            try {
                let updatedInstitution = {...institution, webPage: webPage}
                const response = await updateInstitutionById(contactId, updatedInstitution, auth)
                updateState(response)
            } catch (Error) {
                console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
            }
        }
        setWebPageFormVisible(!webPageFormVisible);
    }
    const handleWebPageChange = (e) => {
        setWebPage(e.target.value)
    }

    const displayWebPage = () => {
        if (isFieldEmptyNullOrUndefined(institution.webPage)) {
            return "Brak strony"
        }
        return institution.webPage;
    }


useEffect(() => {
        if (nameFormVisible && nameInputRef.current) {
            nameInputRef.current.focus();
        }
        if (cityFormVisible && cityInputRef.current) {
            cityInputRef.current.focus();
        }
        if (categoryFormVisible && categoryInputRef.current) {
            categoryInputRef.current.focus();
        }
        if (notesFormVisible && notesInputRef.current) {
            notesInputRef.current.focus();
        }
        if (emailFormVisible && emailInputRef.current) {
            emailInputRef.current.focus();
        }
        if (phoneFormVisible && phoneInputRef.current) {
            phoneInputRef.current.focus();
        }
        if (webPageFormVisible && webPageInputRef.current) {
            webPageInputRef.current.focus();
        }

    },
    [nameFormVisible, cityFormVisible, categoryFormVisible, notesFormVisible,
        emailFormVisible, phoneFormVisible, webPageFormVisible]);


    return (


        <li className={"cd-children-li"}>
            <div className={"cd-children-name-container"}>
                <span className={"cd-children-span"}>
                    {nameFormVisible ?
                        <input type={"text"} ref={nameInputRef} value={name} onChange={handleNameChange}
                               onBlur={toggleNameForm}/>
                        :
                        <h6 onClick={toggleNameForm} className={"cd-children-name"}>{name}</h6>
                    }
                </span>

                <span>
                    <button onClick={handleDetailsButton}>Szczegóły</button>
                    <button onClick={handleDeleteButton}>Usuń</button>
                </span>

            </div>

            <div hidden={listHidden}>
                <ul className={"cd-children-details-container"}>
                    <li>
                        {cityFormVisible ?
                            <input type={"text"} ref={cityInputRef} value={city}
                                   onChange={handleCityChange} onBlur={toggleCityForm}/>
                            :
                            <div hidden={cityFormVisible} onClick={toggleCityForm}>{city}</div>}
                    </li>

                    <li>
                        {categoryFormVisible ?
                            <input type={"text"} ref={categoryInputRef} value={category}
                                   onChange={handleCategoryChange} onBlur={toggleCategoryForm}/>
                            :
                            <div hidden={categoryFormVisible}
                                 onClick={toggleCategoryForm}>{category}</div>
                        }
                    </li>

                    <li>{notesFormVisible ?
                        <textarea ref={notesInputRef} value={notes}
                                  onChange={handleNotesChange} onBlur={toggleNotesForm}/>
                        :
                        <div hidden={notesFormVisible} onClick={toggleNotesForm}>{displayNotes()}</div>
                    }
                    </li>

                    <li>{emailFormVisible ?
                        <input type={"text"} ref={emailInputRef} value={email}
                               onChange={handleEmailChange} onBlur={toggleEmailForm}/>
                        :
                        <div hidden={emailFormVisible} onClick={toggleEmailForm}>{displayEmail()}</div>}
                    </li>

                    <li>{phoneFormVisible ?
                        <input type={"text"} ref={phoneInputRef} value={phone}
                               onChange={handlePhoneChange} onBlur={togglePhoneForm}/>
                        :
                        <div hidden={emailFormVisible} onClick={togglePhoneForm}>{displayPhone()}</div>}
                    </li>

                    <li>{webPageFormVisible ?
                        <input type={"text"} ref={webPageInputRef} value={webPage}
                               onChange={handleWebPageChange} onBlur={toggleWebPageForm}/>
                        :
                        <div hidden={webPageFormVisible} onClick={toggleWebPageForm}>{displayWebPage()}</div>}
                    </li>
                    {errors.map((el, index) => <li key={index} className={"cd-details-error"}>{el}</li>)}
                </ul>
            </div>
        </li>
    )
}

export default SingleInstitution