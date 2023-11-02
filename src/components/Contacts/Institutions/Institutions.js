import React, {useEffect, useState} from "react"
import {addInstitution} from "../../../api/institutions";
import SingleInstitution from "../../../containers/Contacts/Institutions/SingleInstitution";
import "../ContactDetailsChildren.css"
import {getCurrentTimeAndDate} from "../../../appConstans/appConstans";
import {blankCheck, emailOrEmptyCheck, phoneOrEmptyCheck} from "../../../appUtils/appUtils";


const Institutions = ({contactId, updateContact, contacts, auth}) => {
    let contact = contacts.find(contact => contact.id === contactId);
    let institutions = contact.institutions === null ? [] : contact.institutions;

    const [formHidden, setFormHidden] = useState(true);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");
    const [email, setEmail] = useState("")
    const [webPage, setWebPage] = useState("")
    const [phone, setPhone] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)


    const toggleForm = () => {
        setFormHidden(!formHidden);
    }
    const restartInputs = () => {
        setName("");
        setNotes("");
        setCity("");
        setCategory("");
        setPhone("");
        setEmail("");
        setWebPage("");
    }
    const createUpdatedContact = (institution) => {
        return {...contact, institutions: [...contact.institutions, institution], updated: getCurrentTimeAndDate()}
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let institution = {name: name, city: city, category: category,
            notes: notes, email:email, phone:phone, webPage:webPage}
        const response = await addInstitution(institution, contactId, auth)
        updateContact(createUpdatedContact(response))
        restartInputs();
        setFormHidden(true)
    }


    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onCityChange = (e) => {
        setCity(e.target.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const onNotesChange = (e) => {
        setNotes(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const onWebPageChange = (e) => {
        setWebPage(e.target.value)
    }

    const checkButton = () => {
        if (blankCheck(name) || blankCheck(city)
            || blankCheck(category)
            || !phoneOrEmptyCheck(phone) ||!emailOrEmptyCheck(email)) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }

    useEffect(() => {
        checkButton()
    }, [name, city, category, email, phone])


    return (
        <span className={"cd-children-container"}>
            <h3 className={"cd-children-header"}>Instytucje:</h3>
            <ul className={"cd-children-list"}>
                {institutions.map((el, index) => {
                    return (
                        <SingleInstitution institutionId={el.id} index={index} contactId={contactId} key={index}/>
                    )
                })}
            </ul>
            <div className={"cd-add-children-container"}>
                <h6 onClick={toggleForm} className={"cd-add-children-title"}>Dodaj instutucję</h6>
                <form hidden={formHidden} onSubmit={handleSubmit}>
                    <ul className={"cd-children-list"}>
                        <li><input type={"text"} placeholder={"Nazwa"} value={name} onChange={onNameChange}/></li>
                        <li><input type={"text"} placeholder={"Miasto"} value={city} onChange={onCityChange}/></li>
                        <li><input type={"text"} placeholder={"Kategoria"} value={category} onChange={onCategoryChange}/></li>
                        <li><input type={"text"} placeholder={"Numer"} value={phone} onChange={onPhoneChange}/></li>
                        <li><input type={"text"} placeholder={"Strona"} value={webPage} onChange={onWebPageChange}/></li>
                        <li><input type={"text"} placeholder={"Email"} value={email} onChange={onEmailChange}/></li>
                        <li><textarea placeholder={"Notatki"} value={notes} onChange={onNotesChange}/></li>
                    </ul>
                    <button type={"submit"} disabled={buttonDisabled}>Dodaj</button>
                </form>
            </div>
        </span>
    )
}

export default Institutions