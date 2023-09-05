import React from "react";
import {deleteContactById} from "../../api/contacts";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {NavLink} from "react-router-dom";


const SingleContact = ({contact, onDelete}) => {

    const handleOnClick = async () => {
        confirmAlert({
            title: 'Usuwanie kontaktu',
            message: 'Usuwając kontakt, usuniesz wszystkie powiązane dane',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteContactById(contact.id);
                        onDelete(contact.id);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    };

    return <li>
        Nazwa: {contact.title}
        <button><NavLink to={"http://localhost:3000/contacts/" + contact.id}>
            Szczegóły
        </NavLink>
        </button>
        <button onClick={handleOnClick}>Usuń</button>
    </li>
}

export default SingleContact