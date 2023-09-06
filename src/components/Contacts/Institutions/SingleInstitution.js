import React, {useEffect, useRef, useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import {deleteInstitutionById, updateInstitutionById} from "../../../api/institutions";

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
    const handleCategoryChange = (e) => {
        setInstitutionCategory(e.target.value)
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
    }, [nameFormVisible, cityFormVisible]);


    return (
        <div>
            <div style={{display: "flex"}}>
                <h6 hidden={nameFormVisible} onClick={toggleNameForm}>{institutionName}</h6>
                <form hidden={!nameFormVisible} onBlur={toggleNameForm}>
                    <input type={"text"} ref={nameInputRef} value={institutionName} onChange={handleNameChange}/>
                </form>
                <button onClick={handleDetailsButton}>Szczegóły</button>
                <button onClick={handleDeleteButton}>Usuń</button>
            </div>

            <div hidden={listHidden}>
                <ul>
                    <li style={{display: "flex"}}>Miasto:
                        <div hidden={cityFormVisible} onClick={toggleCityForm}>{institutionCity}</div>
                        <form hidden={!cityFormVisible} onBlur={toggleCityForm}>
                            <input type={"text"} ref={cityInputRef} value={institutionCity}
                                   onChange={handleCityChange}/>
                        </form>
                    </li>

                    <li style={{display: "flex"}}>Kategoria:
                        <div hidden={categoryFormVisible} onClick={toggleCategoryForm}>{institutionCategory}</div>
                        <form hidden={!categoryFormVisible} onBlur={toggleCategoryForm}>
                            <input type={"text"} ref={categoryInputRef} value={institutionCategory}
                                   onChange={handleCategoryChange}/>
                        </form>

                    </li>
                </ul>
            </div>
        </div>
    )
}
export default SingleInstitution