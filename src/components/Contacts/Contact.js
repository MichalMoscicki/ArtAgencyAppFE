import React from "react";
import {deleteContactById} from "../../api/contacts";


    const Contact = ({contact, onDelete}) => {

        const handleOnClick = async () => {
            await deleteContactById(contact.id);
            onDelete(contact.id);
        }


    return <li>
        Nazwa: {contact.title}
        <button>Szczegóły</button>
        <button onClick={handleOnClick}>Usuń</button>
    </li>
}
export default Contact