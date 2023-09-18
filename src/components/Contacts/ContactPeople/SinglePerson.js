import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import "../ContactDetailsChildren.css"
import {blankCheck} from "../../../appUtils/appUtils";
import {deleteContactPersonById, updateContactPersonById} from "../../../api/contactPeople";
import {
    emailRegex,
    getCurrentTimeAndDate, isFieldEmptyNullOrUndefined,
    phoneRegex,
    wrongEmailMessage,
    wrongPhoneMessage
} from "../../../appConstans/appConstans";

const SinglePerson = ({contactId, contacts, index, personId, updateContact}) => {

    let contact = contacts.find(contact => contact.id === contactId);
    const person = contact.contactPeople.find(person => person.id === personId);

    const [listHidden, setListHidden] = useState(true);
    const [errors, setErrors] = useState([])

    const updateState = (updatedPerson) => {
        const updatedPeople = [...contact.contactPeople]
        updatedPeople[index] = updatedPerson;
        const updatedContact = {
            ...contact, contactPeople: updatedPeople, updated: getCurrentTimeAndDate()
        }
        updateContact(updatedContact)
    }
    const handleDeleteButton = () => {
        confirmAlert({
            title: 'Usuwanie osoby',
            message: 'Czy na pewno?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteContactPersonById(contactId, personId);
                        const updatedContact = {
                            ...contact,
                            contactPeople: contact.contactPeople.filter(person => person.id !== personId)
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


    const [firstName, setFirstName] = useState(person.firstName);
    const [firstNameFormVisible, setFirstNameFormVisible] = useState(false)
    const firstNameInputRef = useRef(null);
    const toggleFirstNameForm = async () => {
        if (firstNameFormVisible === true && firstName !== person.firstName) {
            if (blankCheck(firstName)) {
                setFirstName(person.firstName)
            } else {
                try {
                    let updatedPerson = {...person, firstName: firstName}
                    const response = await updateContactPersonById(contactId, updatedPerson)
                    updateState(response);

                } catch (Error) {
                    console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                }
            }
        }
        setFirstNameFormVisible(!firstNameFormVisible)
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const [lastName, setLastName] = useState(person.lastName);
    const [lastNameFormVisible, setLastNameFormVisible] = useState(false)
    const lastNameInputRef = useRef(null);
    const toggleLastNameForm = async () => {
        if (lastNameFormVisible === true && lastName !== person.lastName) {
            if (blankCheck(lastName)) {
                setLastName(person.lastName)
            } else {
                try {
                    let updatedPerson = {...person, lastName: lastName}
                    const response = await updateContactPersonById(contactId, updatedPerson)
                    updateState(response);
                } catch (Error) {
                    console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
                }
            }
        }
        setLastNameFormVisible(!lastNameFormVisible)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }


    const [role, setRole] = useState(person.role);
    const [roleFormVisible, setRoleFormVisible] = useState(false)
    const roleInputRef = useRef(null);
    const toggleRoleForm = async () => {
        if (roleFormVisible === true && role !== person.role) {
            try {
                let updatedPerson = {...person, role: role}
                const response = await updateContactPersonById(contactId, updatedPerson)
                updateState(response);
            } catch (Error) {
                console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
            }
        }
        setRoleFormVisible(!roleFormVisible);
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }
    const displayRole = () => {
        if (isFieldEmptyNullOrUndefined(person.role)) {
            return "Brak roli"
        }
        return person.role;
    }


    const [email, setEmail] = useState(person.email);
    const [emailFormVisible, setEmailFormVisible] = useState(false)
    const emailInputRef = useRef(null);
    const toggleEmailForm = async () => {
        setErrors([])
        if(!emailRegex.test(email) && !isFieldEmptyNullOrUndefined(email)){
            setErrors([wrongEmailMessage])
            return
        }

        if (emailFormVisible === true && email !== person.email) {
            try {
                let updatedPerson = {...person, email: email}
                const response = await updateContactPersonById(contactId, updatedPerson)
                updateState(response);
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
        if (isFieldEmptyNullOrUndefined(person.email)) {
            return "Brak emaila"
        }
        return person.email;
    }

    const [phone, setPhone] = useState(person.phone);
    const [phoneFormVisible, setPhoneFormVisible] = useState(false)
    const phoneInputRef = useRef(null);
    const togglePhoneForm = async () => {
        setErrors([])

        if (!phoneRegex.test(phone) && !isFieldEmptyNullOrUndefined(phone) ) {
           setErrors([wrongPhoneMessage])
            return;
        }
        if (phoneFormVisible === true && phone !== person.phone) {
            try {
                let updatedPerson = {...person, phone: phone}
                const response = await updateContactPersonById(contactId, updatedPerson)
                updateState(response);
            } catch (Error) {
                setErrors([wrongPhoneMessage])
                return
            }
        }
        setPhoneFormVisible(!phoneFormVisible);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const displayPhone = () => {
        if (isFieldEmptyNullOrUndefined(person.phone)) {
            return "Brak numeru telefonu"
        }
        return person.phone;
    }


    useEffect(() => {
            if (firstNameFormVisible && firstNameInputRef.current) {
                firstNameInputRef.current.focus();
            }
            if (lastNameFormVisible && lastNameInputRef.current) {
                lastNameInputRef.current.focus();
            }
            if (roleFormVisible && roleInputRef.current) {
                roleInputRef.current.focus();
            }
            if (emailFormVisible && emailInputRef.current) {
                emailInputRef.current.focus();
            }
            if (phoneFormVisible && phoneInputRef.current) {
                phoneInputRef.current.focus();
            }
        },
        [firstNameFormVisible, lastNameFormVisible, roleFormVisible, emailFormVisible, phoneFormVisible]);


    return (

        <li className={"cd-children-li"}>
            <div className={"cd-children-name-container"}>
                <span className={"cd-children-span"}>
                    {firstNameFormVisible ?
                        <input type={"text"} ref={firstNameInputRef} value={firstName} onChange={handleFirstNameChange}
                               onBlur={toggleFirstNameForm}/>
                        :
                        <h6 onClick={toggleFirstNameForm} className={"cd-children-name"}>{firstName}</h6>
                    }
                </span>
                <span className={"cd-children-span"}>
                    {lastNameFormVisible ?
                        <input type={"text"} ref={lastNameInputRef} value={lastName} onChange={handleLastNameChange}
                               onBlur={toggleLastNameForm}/>
                        :
                        <h6 onClick={toggleLastNameForm} className={"cd-children-name"}>{lastName}</h6>
                    }
                </span>
                <span>
                    <button onClick={handleDetailsButton}>Szczegóły</button>
                    <button onClick={handleDeleteButton}>Usuń</button>
                </span>
            </div>

            <div hidden={listHidden}>
                <ul className={"cd-children-details-container"}>
                    <li>{roleFormVisible ?
                        <textarea ref={roleInputRef} onChange={handleRoleChange} value={role} onBlur={toggleRoleForm}/>
                        :
                        <div hidden={roleFormVisible} onClick={toggleRoleForm}>{displayRole()}</div>}
                    </li>
                    <li>{emailFormVisible ?
                        <textarea ref={emailInputRef} onChange={handleEmailChange} value={email}
                                  onBlur={toggleEmailForm}/>
                        :
                        <div hidden={emailFormVisible} onClick={toggleEmailForm}>{displayEmail()}</div>}
                    </li>
                    <li>{phoneFormVisible ?
                        <textarea ref={phoneInputRef} onChange={handlePhoneChange} value={phone}
                                  onBlur={togglePhoneForm}/>
                        :
                        <div hidden={phoneFormVisible} onClick={togglePhoneForm}>{displayPhone()}</div>}
                    </li>
                    {errors.map((el, index) => <li key={index} className={"cd-details-error"}>{el}</li>)}
                </ul>
            </div>
        </li>
    )
}

export default SinglePerson