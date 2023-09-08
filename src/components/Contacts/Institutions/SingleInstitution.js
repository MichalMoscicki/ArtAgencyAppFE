import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import {deleteInstitutionById, updateInstitutionById} from "../../../api/institutions";
import "../ContactDetailsChildren.css"

const SingleInstitution = ({institution, onDeleteInstitution, contactId}) => {
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
    const toggleNameForm = () => {
        if (nameFormVisible === true && institutionName !== institution.name) {
            let updatedInstitution = {...institution, name: institutionName}
            updateInstitutionById(contactId, updatedInstitution)
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
            let updatedInstitution = {...institution, city: institutionCity}
            updateInstitutionById(contactId, updatedInstitution)
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
            let updatedInstitution = {...institution, category: institutionCategory}
            updateInstitutionById(contactId, updatedInstitution)
        }
        setCategoryFormVisible(!categoryFormVisible)
    }


    const ifNotesPresent = () => {
        if(institution.notes === ""){
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
            let updatedInstitution = {...institution, notes: institutionNotes}
            updateInstitutionById(contactId, updatedInstitution)
        }
        setNotesFormVisible(!notesFormVisible)
    }

    const handleCategoryChange = (e) => {
        setInstitutionNotes(e.target.value)
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

    }, [nameFormVisible, cityFormVisible, categoryFormVisible, notesFormVisible]);


    return (


        <li className={"cd-children-li"}>
            <div className={"cd-children-name-container"}>
                <span className={"cd-children-span"}>
                    {nameFormVisible ?
                        <input type={"text"} ref={nameInputRef} value={institutionName} onChange={handleNameChange} onBlur={toggleNameForm} />
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
                            <div hidden={categoryFormVisible} onClick={toggleCategoryForm}>{institutionCategory}</div>
                        }
                    </li>

                    <li>
                        {notesFormVisible ?
                            <input type={"textarea"} ref={notesInputRef} value={institutionNotes}
                                   onChange={handleCategoryChange} onBlur={toggleNotesForm}/>
                            :
                            <div hidden={categoryFormVisible} onClick={toggleNotesForm}>{institutionNotes}</div>
                        }
                    </li>
                </ul>
            </div>
        </li>
    )
}
export default SingleInstitution