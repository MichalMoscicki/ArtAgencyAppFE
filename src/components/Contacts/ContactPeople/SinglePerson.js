import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import "../ContactDetailsChildren.css"
import {blankCheck} from "../../../appUtils/appUtils";
import {deleteContactPersonById, updateContactPersonById} from "../../../api/contactPeople";
import {
    noAssignedEmail,
    noAssignedPhone,
    noAssignedRole,
    wrongEmailMessage,
    wrongPhoneMessage
} from "../../../appConstans/appConstans";

const SinglePerson = ({person, onDeletePerson, contactId}) => {
    const [listHidden, setListHidden] = useState(true);
    const [errors, setErrors] = useState([])
    const handleDeleteButton = () => {
        confirmAlert({
            title: 'Usuwanie osoby',
            message: 'Czy na pewno?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteContactPersonById(contactId, person.id);
                        onDeletePerson(person.id)
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
                    await updateContactPersonById(contactId, updatedPerson)
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
                    await updateContactPersonById(contactId, updatedPerson)
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

    const ifRolePresent = () => {
        if (person.role === "") {
            return noAssignedRole
        } else {
            return person.role
        }
    }
    const [role, setRole] = useState(ifRolePresent);
    const [roleFormVisible, setRoleFormVisible] = useState(false)
    const roleInputRef = useRef(null);
    const toggleRoleForm = async () => {
        if (role === noAssignedRole) {
            setRoleFormVisible(!roleFormVisible);
            return;
        }
        if (roleFormVisible === true && role !== person.role) {
            try {
                let updatedPerson = {...person, role: role}
                await updateContactPersonById(contactId, updatedPerson)
            } catch (Error) {
                console.log("Tutaj obsługa wyjątków, o których nie mam pojęcia, że się mogą wydarzyć")
            }
        }
        setRoleFormVisible(!roleFormVisible);
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    //error handling

    const ifEmailPresent = () => {
        if (person.email === "") {
            return noAssignedEmail
        } else {
            return person.email
        }
    }
    const [email, setEmail] = useState(ifEmailPresent);
    const [emailFormVisible, setEmailFormVisible] = useState(false)
    const emailInputRef = useRef(null);
    const toggleEmailForm = async () => {
        setErrors([])

        if (email === noAssignedEmail) {
            setEmailFormVisible(!emailFormVisible);
            return;
        }
        if (emailFormVisible === true && email !== person.email) {
            try {
                let updatedPerson = {...person, email: email}
                await updateContactPersonById(contactId, updatedPerson)

            } catch (Error) {
                setErrors([wrongEmailMessage])
                return
            }
        }
        setEmailFormVisible(!emailFormVisible);

    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const ifPhonePresent = () => {
        if (person.phone === "") {
            return noAssignedPhone
        } else {
            return person.phone
        }
    }
    const [phone, setPhone] = useState(ifPhonePresent);
    const [phoneFormVisible, setPhoneFormVisible] = useState(false)
    const phoneInputRef = useRef(null);
    const togglePhoneForm = async () => {
        setErrors([])

        if (phone === noAssignedPhone) {
            setPhoneFormVisible(!phoneFormVisible);
            return;
        }
        if (phoneFormVisible === true && phone !== person.phone) {
            try {
                let updatedPerson = {...person, phone: phone}
                await updateContactPersonById(contactId, updatedPerson)

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
        },
        [firstNameFormVisible, lastNameFormVisible, roleFormVisible, emailFormVisible]);


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
                        <div hidden={roleFormVisible} onClick={toggleRoleForm}>{role}</div>}
                    </li>
                    <li>{emailFormVisible ?
                        <textarea ref={emailInputRef} onChange={handleEmailChange} value={email}
                                  onBlur={toggleEmailForm}/>
                        :
                        <div hidden={emailFormVisible} onClick={toggleEmailForm}>{email}</div>}
                    </li>
                    <li>{phoneFormVisible ?
                        <textarea ref={phoneInputRef} onChange={handlePhoneChange} value={phone}
                                  onBlur={togglePhoneForm}/>
                        :
                        <div hidden={phoneFormVisible} onClick={togglePhoneForm}>{phone}</div>}
                    </li>
                    {errors.map((el, index) => <li key={index} className={"cd-details-error"}>{el}</li>)}
                </ul>
            </div>
        </li>
    )
}

export default SinglePerson