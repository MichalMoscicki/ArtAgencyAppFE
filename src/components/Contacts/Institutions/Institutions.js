import React, {useEffect, useState} from "react"
import {addInstitution} from "../../../api/institutions";
import SingleInstitution from "./SingleInstitution";
import "../ContactDetailsChildren.css"


const Institutions = (props) => {
    const [formHidden, setFormHidden] = useState(true);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");
    const [email, setEmail] = useState("")
    const [webPage, setWebPage] = useState("")
    const [phone, setPhone] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const checkButton = () => {
        if (name === "" || city === "" || category === "") {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }
    const toggleForm = () => {
        setFormHidden(!formHidden);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let institution = {name: name, city: city, category: category,
            notes: notes, email:email, phone:phone, webPage:webPage}
        const data = await addInstitution(institution, props.contactId)
        await props.onAddInstitution(data);
        setName("");
        setNotes("");
        setCity("");
        setCategory("");
        setPhone("");
        setEmail("");
        setWebPage("");
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

    useEffect(() => {
        checkButton()
    }, [name, city, category])


    return (
        <span className={"cd-children-container"}>
            <h3 className={"cd-children-header"}>Instytucje:</h3>
            <ul className={"cd-children-list"}>
                {props.institutions.map((el, index) => {
                    return (
                        <SingleInstitution institution={el}
                                           onDeleteInstitution={props.onDeleteInstitution}
                                           contactId={props.contactId}
                                           key={index}/>
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