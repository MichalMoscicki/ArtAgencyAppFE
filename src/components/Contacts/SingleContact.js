import React from "react";
import {deleteContactById} from "../../api/contacts";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {NavLink} from "react-router-dom";
import "./SingleContact.css"

const SingleContact = ({contact, removeContact, auth}) => {

    const handleOnClick = async () => {
        confirmAlert({
            title: 'Usuwanie kontaktu',
            message: 'Usuwając kontakt, usuniesz wszystkie powiązane dane',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await deleteContactById(contact.id, auth);
                        removeContact(contact);
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

    return <li className={"single-contact"}>
        <span className={"contact-title"}>{contact.title}</span>

        <span className={"contact-btns"}>
             <button>
                 <NavLink to={"http://localhost:3000/contacts/" + contact.id}>
                    Szczegóły
                </NavLink>
             </button>
             <button onClick={handleOnClick} >Usuń</button>
        </span>
    </li>
}

export default SingleContact