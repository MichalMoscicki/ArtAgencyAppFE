import React from "react";
import {useState, useEffect} from "react";
import {addContact, getContactsInitialRequest, getContactsSubsequentRequest,} from "../../api/contacts";
import SingleContact from "../../containers/Contacts/SingleContact";
import "./Contacts.css"

const Contacts = ({contacts, pagination, addContactsToState, addContactToState, addPagination}) => {
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)

    const [contactName, setContactName] = useState("");
    const [alreadyCooperated, setAlreadyCooperated] = useState(false);
    const [formHidden, setFormHidden] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            let response = await getContactsInitialRequest(null);
            await addContactsToState(response.content);
            await addPagination({
                pageNo: response.pageNo,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last
            })
        }

        if (contacts.length === 0) {
            fetchInitialData()
        }


    }, []);
    useEffect( () =>{
        const checkButtons = () => {
            if (pagination.pageNo === 0) {
                setPrevButtonDisabled(true)
            } else {
                setPrevButtonDisabled(false)
            }

            if (pagination.last) {
                setNextButtonDisabled(true)
            } else {
                setNextButtonDisabled(false)
            }
        }
        checkButtons()
    }, [pagination])


    const onSubmit = async (e) => {
        e.preventDefault();
        const contact = {title: contactName, alreadyCooperated: alreadyCooperated}
        let response = await addContact(contact);
        await addContactToState(response)
        setContactName("");
        setFormHidden(!formHidden);
    }
    const onChange = (e) => {
        setContactName(e.target.value)
    }
    const onCheck = () => {
        setAlreadyCooperated(!alreadyCooperated)
    }
    const toggleForm = () => {
        setFormHidden(!formHidden)
    }
    const handlePageButton = async (index) => {
        const fetchSubsequentData = async (pageNo) => {
            let response = await getContactsSubsequentRequest(pageNo);
            await addContactsToState(response.content);
            await addPagination({
                pageNo: response.pageNo,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last
            })
        }

        await fetchSubsequentData(index)
    }
    const generatePagesButtons = () => {
        let buttons = [];
        for (let i = 0; i < pagination.totalPages; i++) {
            buttons = [...buttons, <button key={i} onClick={() => handlePageButton(i)}>{i}</button>]
        }
        return buttons;
    }

    return (
        <div className="contacts-container">
            <div className={"contacts-container-header"}>
                <span><h1>Kontakty</h1></span>
                <span className={"contacts-container-header-pagination"}>
                    <ul>
                        <li>
                            <button onClick={() => handlePageButton(pagination.pageNo - 1)} disabled={prevButtonDisabled}>poprzednia</button>
                        </li>
                        <li>
                            {generatePagesButtons()}
                        </li>
                        <li>
                            <button onClick={() => handlePageButton(pagination.pageNo + 1)} disabled={nextButtonDisabled}>kolejna</button>
                        </li>
                    </ul>
                </span>

            </div>
            <ul className={"contacts-list"}>
                {contacts.map((el, index) => {
                    return (<SingleContact contact={el} key={index}/>)
                })}
            </ul>
            <h3 onClick={toggleForm} className={"add-contact"}>Dodaj kontakt</h3>
            <form onSubmit={onSubmit} hidden={formHidden}>
                <ul className={"contacts-form-list"}>
                    <li><input onChange={onChange} placeholder={"Nazwa kontaktu"} value={contactName}/></li>
                    <li>Czy już współpracowaliśmy<input type="checkbox" onChange={onCheck}/></li>
                </ul>
                <div className={"submit-contact-btn"}>
                    <button type={"submit"} disabled={!contactName}>Dodaj</button>
                </div>
            </form>
        </div>
    )
}

export default Contacts;