import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import {deleteInstitutionById, updateInstitutionById} from "../../../api/institutions";
import "../ContactDetailsChildren.css"
import {blankRegex} from "../../../appConstans/appConstans";

const SingleInstitution = ({institution, onDeleteInstitution, contactId}) => {
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
                        await deleteInstitutionById(contactId, institution.id);
                        onDeleteInstitution(institution.id)
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


    const [institutionName, setInstitutionName] = useState(institution.name);
    const [nameFormVisible, setNameFormVisible] = useState(false)
    const nameInputRef = useRef(null);
    const toggleNameForm = async () => {
        setErrors([]);
        if (nameFormVisible === true && institutionName !== institution.name) {
            try {
                let updatedInstitution = {...institution, name: institutionName}
                await updateInstitutionById(contactId, updatedInstitution)
            } catch(Error){
                setErrors((prevState) => [...prevState, "Nazwa nie może być pusta"])
            }
        }
        setNameFormVisible(!nameFormVisible)
    }
    const handleNameChange = (e) => {
        setInstitutionName(e.target.value)
    }


    const [institutionCity, setInstitutionCity] = useState(institution.city);
    const [cityFormVisible, setCityFormVisible] = useState(false)
    const cityInputRef = useRef(null);
    const toggleCityForm = () => {
        if (cityFormVisible === true && institutionCity !== institution.city) {

            if (blankRegex.test(institutionCity)) {
                setInstitutionCity(institution.city)
            } else {
                let updatedInstitution = {...institution, city: institutionCity}
                updateInstitutionById(contactId, updatedInstitution)
            }
        }
        setCityFormVisible(!cityFormVisible)
    }
    const handleCityChange = (e) => {
        setInstitutionCity(e.target.value)
    }


    const [institutionCategory, setInstitutionCategory] = useState(institution.category);
    const [categoryFormVisible, setCategoryFormVisible] = useState(false)
    const categoryInputRef = useRef(null);
    const toggleCategoryForm = () => {
        if (categoryFormVisible === true && institutionCategory !== institution.category) {

            if (blankRegex.test(institutionCategory)) {
                setInstitutionCategory(institution.category)
            } else {
                let updatedInstitution = {...institution, category: institutionCategory}
                updateInstitutionById(contactId, updatedInstitution)
            }
        }
        setCategoryFormVisible(!categoryFormVisible)
    }
    const handleCategoryChange = (e) => {
        setInstitutionCategory(e.target.value)
    }


    const ifNotesPresent = () => {
        if (institution.notes === "") {
            return "Brak notatek"
        } else {
            return institution.notes
        }
    }
    const [institutionNotes, setInstitutionNotes] = useState(ifNotesPresent);
    const [notesFormVisible, setNotesFormVisible] = useState(false)
    const notesInputRef = useRef(null);
    const toggleNotesForm = () => {
        if (notesFormVisible === true && institutionNotes !== institution.notes) {
            if (blankRegex.test(institutionNotes)) {
                setInstitutionNotes("Brak notatek")
            }
            let updatedInstitution = {...institution, notes: institutionNotes}
            updateInstitutionById(contactId, updatedInstitution)
        }
        setNotesFormVisible(!notesFormVisible)
    }
    const handleNotesChange = (e) => {
        setInstitutionNotes(e.target.value)
    }


    const ifEmailPresent = () => {
        if (institution.email === "") {
            return "Brak emaila"
        } else {
            return institution.email
        }
    }
    const [institutionEmail, setInstitutionEmail] = useState(ifEmailPresent);
    const [emailFormVisible, setEmailFormVisible] = useState(false);
    const emailInputRef = useRef(null);
    const toggleEmailForm = () => {
        //todo walidacja emaila
        if (emailFormVisible === true && institutionEmail !== institution.email) {
            let updatedInstitution = {...institution, email: institutionEmail}
            updateInstitutionById(contactId, updatedInstitution)
        }
        setEmailFormVisible(!emailFormVisible);
    }
    const handleEmailChange = (e) => {
        setInstitutionEmail(e.target.value)
    }


    const ifPhonePresent = () => {
        if (institution.phone === "") {
            return "Brak numeru"
        } else {
            return institution.phone
        }
    }
    const [institutionPhone, setInstitutionPhone] = useState(ifPhonePresent);
    const [phoneFormVisible, setPhoneFormVisible] = useState(false);
    const phoneInputRef = useRef(null);
    const togglePhoneForm = async () => {
        setErrors([])
        if (phoneFormVisible === true && institutionPhone !== institution.email) {
            //todo sprawdzić, czy jest empty lub blank
            try {
                let updatedInstitution = {...institution, phone: institutionPhone}
                await updateInstitutionById(contactId, updatedInstitution)
            } catch(Error) {
                setInstitutionPhone(ifPhonePresent())
                setErrors((prevState) => [...prevState, "Niepoprawny numer telefonu"])
            }
        }
        setPhoneFormVisible(!phoneFormVisible);
    }
    const handlePhoneChange = (e) => {
        setInstitutionPhone(e.target.value)
    }



    const ifWebPagePresent = () => {
        if (institution.webPage === "") {
            return "Brak strony"
        } else {
            return institution.webPage
        }
    }
    const [institutionWebPage, setInstitutionWebPage] = useState(ifWebPagePresent);
    const [webPageFormVisible, setWebPageFormVisible] = useState(false);
    const webPageInputRef = useRef(null);
    const toggleWebPageForm = () => {
        if (webPageFormVisible === true && institutionWebPage !== institution.webPage) {
            let updatedInstitution = {...institution, webPage: institutionWebPage}
            updateInstitutionById(contactId, updatedInstitution)
            if(institutionWebPage === ""){
                setInstitutionWebPage("Brak strony")
            }
        }
        setWebPageFormVisible(!webPageFormVisible);
    }
    const handleWebPageChange = (e) => {
        setInstitutionWebPage(e.target.value)
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
                        <input type={"text"} ref={nameInputRef} value={institutionName} onChange={handleNameChange}
                               onBlur={toggleNameForm}/>
                        :
                        <h6 onClick={toggleNameForm} className={"cd-children-name"}>{institutionName}</h6>
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
                            <input type={"text"} ref={cityInputRef} value={institutionCity}
                                   onChange={handleCityChange} onBlur={toggleCityForm}/>
                            :
                            <div hidden={cityFormVisible} onClick={toggleCityForm}>{institutionCity}</div>}
                    </li>

                    <li>
                        {categoryFormVisible ?
                            <input type={"text"} ref={categoryInputRef} value={institutionCategory}
                                   onChange={handleCategoryChange} onBlur={toggleCategoryForm}/>
                            :
                            <div hidden={categoryFormVisible}
                                 onClick={toggleCategoryForm}>{institutionCategory}</div>
                        }
                    </li>

                    <li>{notesFormVisible ?
                        <textarea ref={notesInputRef} value={institutionNotes}
                                  onChange={handleNotesChange} onBlur={toggleNotesForm}/>
                        :
                        <div hidden={notesFormVisible} onClick={toggleNotesForm}>{institutionNotes}</div>
                    }
                    </li>
                    <li>{emailFormVisible ?
                        <input type={"text"} ref={emailInputRef} value={institutionEmail}
                               onChange={handleEmailChange} onBlur={toggleEmailForm}/>
                        :
                        <div hidden={emailFormVisible} onClick={toggleEmailForm}>{institutionEmail}</div>
                    }</li>
                    <li>{phoneFormVisible ?
                        <input type={"text"} ref={phoneInputRef} value={institutionPhone}
                               onChange={handlePhoneChange} onBlur={togglePhoneForm}/>
                        :
                        <div hidden={emailFormVisible} onClick={togglePhoneForm}>{institutionPhone}</div>
                    }</li>
                    <li>{webPageFormVisible ?
                        <input type={"text"} ref={webPageInputRef} value={institutionWebPage}
                               onChange={handleWebPageChange} onBlur={toggleWebPageForm}/>
                        :
                        <div hidden={webPageFormVisible} onClick={toggleWebPageForm}>{institutionWebPage}</div>
                    }</li>
                    {errors.map( (el, index) => <li key={index} className={"cd-details-error"}>{el}</li>)}
                </ul>
            </div>
        </li>
    )
}

export default SingleInstitution