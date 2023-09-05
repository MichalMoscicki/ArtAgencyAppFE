import React, {useState} from "react";
import {confirmAlert} from "react-confirm-alert";
import{deleteInstitutionById} from "../../../api/institutions";

//TODO potwierdzenie usunięcia instytucji

const SingleInstitution = ({institution, onDeleteInstitution, contactId}) => {
    const [listHidden, setListHidden] = useState(true);
    const toggleList = () => {
        setListHidden(!listHidden)
    }
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
    const handleUpdateButton = () => {
        console.log("Ok")
    }

    return (
        <div>
            <div onClick={toggleList}>
                <h6>{institution.name}</h6>
                <ul hidden={listHidden}>
                    <li>{institution.city}</li>
                    <li>{institution.category}</li>
                    <li>{institution.notes}</li>
                </ul>
            </div>
            <div>
                <button onClick={handleUpdateButton}>Edytuj</button>
                <button onClick={handleDeleteButton}>Usuń</button>
            </div>
        </div>
    )
}
export default SingleInstitution