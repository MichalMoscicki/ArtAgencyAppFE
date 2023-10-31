import React, {useEffect, useState} from "react"
import {blankCheck, emailOrEmptyCheck, phoneOrEmptyCheck} from "../../../appUtils/appUtils";
import {addContactPerson} from "../../../api/contactPeople";
import {getCurrentTimeAndDate} from "../../../appConstans/appConstans";
import SinglePerson from "../../../containers/Contacts/ContactPeople/SinglePerson";

const ContactPeople = ({contactId, contacts, updateContact, auth}) => {

    const contact = contacts.find(contact => contact.id === contactId);
    const contactPeople = contact.contactPeople;
    const [formHidden, setFormHidden] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const toggleForm = () => {
        setFormHidden(!formHidden);
    }
    const checkButton = () => {
        if (blankCheck(firstName) || blankCheck(lastName)
            || !phoneOrEmptyCheck(phone) ||!emailOrEmptyCheck(email)) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const createUpdatedContact = (contactPerson) => {
        return {...contact, contactPeople: [...contact.contactPeople, contactPerson], updated: getCurrentTimeAndDate()}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactPerson = {
            firstName: firstName,
            lastName:lastName,
            role:role,
            phone:phone,
            email:email
        }
        try {
            const response = await addContactPerson(contactId, contactPerson, auth);
            updateContact(createUpdatedContact(response))
            setFirstName("")
            setLastName("")
            setRole("")
            setPhone("")
            setEmail("")
        } catch (Error) {
            console.log("Trzeba jakoś obsłużyć potencjalny błąd")
        }
        setFormHidden(!formHidden)
    }

    useEffect(() => {
        checkButton()
    }, [firstName, lastName, phone, email])


    return (
        <span className={"cd-children-container"}>
            <h3 className={"cd-children-header"}>Osoby kontaktowe:</h3>
            <ul className={"cd-children-list"}>
                {contactPeople.map((el, index) => {
                    return <SinglePerson personId={el.id} key={index} index={index} contactId={contactId}/>
                })}
            </ul>
            <div className={"cd-add-children-container"}>
                <h6 onClick={toggleForm} className={"cd-add-children-title"}>Dodaj osobę</h6>
                <form hidden={formHidden} onSubmit={handleSubmit}>
                    <ul className={"cd-children-list"}>
                        <li><input type={"text"} placeholder={"Imię"} value={firstName} onChange={handleFirstNameChange}/></li>
                        <li><input type={"text"} placeholder={"Nazwisko"} value={lastName} onChange={handleLastNameChange}/></li>
                        <li><input type={"text"} placeholder={"Funkcja"} value={role} onChange={handleRoleChange}/></li>
                         <li><input type={"text"} placeholder={"Email"} value={email} onChange={handleEmailChange}/></li>
                         <li><input type={"text"} placeholder={"Telefon"} value={phone} onChange={handlePhoneChange}/></li>
                    </ul>
                    <button type={"submit"} disabled={buttonDisabled}>Dodaj</button>
                </form>
            </div>
        </span>
    )
}
export default ContactPeople;