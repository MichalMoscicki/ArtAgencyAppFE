import React, {useState} from "react"
import {addInstitution} from "../../../api/institutions";
import SingleInstitution from "./SingleInstitution";

const Institutions = (props) => {
    const [formHidden, setFormHidden] = useState(true);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");


    const toggleForm = () => {
        setFormHidden(!formHidden);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let institution ={name: name, city:city, category:category, notes:notes}
        const data = await addInstitution(institution, props.contactId)
        await props.onAddInstitution(data);
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




    return(
        <div>
            <h3>Instytucje:</h3>
            <ul>
                {props.institutions.map( (el, index) => {
                    return (
                    <li key={index}>
                        <SingleInstitution institution={el}
                                           onDeleteInstitution={props.onDeleteInstitution}
                                           contactId={props.contactId}/>
                    </li>
                    )
                })}
            </ul>
            <h6 onClick={toggleForm}>Dodaj instutucję</h6>
            <form hidden={formHidden} onSubmit={handleSubmit}>
                <ul>
                    <li><input type={"text"} placeholder={"Nazwa"} value={name} onChange={onNameChange}/></li>
                    <li><input type={"text"} placeholder={"Miasto"} value={city} onChange={onCityChange}/></li>
                    <li><input type={"text"} placeholder={"Kategoria"} value={category} onChange={onCategoryChange}/></li>
                    <li><input type={"textarea"} placeholder={"Notatki"} value={notes} onChange={onNotesChange}/></li>
                </ul>
                <button type={"submit"}>Dodaj</button>
            </form>
        </div>
    )
}

export default Institutions

// blokowanie dodawania, jak nie wszystko jest wypełnione

//dodawanie do contactu w parent component
//usuwanie
//edycja
//edycja w parent component