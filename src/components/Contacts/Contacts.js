import React from "react";
import {useState, useEffect} from "react";
import {addContact, getContactsInitialRequest, getContactsSubsequentRequest,} from "../../api/contacts";
import SingleContact from "../../containers/Contacts/SingleContac";
import "./Contacts.css"

const Contacts = ({contacts, addContactsToState, addContactToState}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLast, setIsLast] = useState(false);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)

    const [contactName, setContactName] = useState("");
    const [alreadyCooperated, setAlreadyCooperated] = useState(false);
    const [formHidden, setFormHidden] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            let response = await getContactsInitialRequest(null);
            await addContactsToState(response.content);
            setCurrentPage(response.pageNo);
            setTotalPages(response.totalPages);
            setIsLast(response.last)
        }
        fetchInitialData()

    }, []);

    const checkPrevButton = () => {
        if(currentPage === 0){
            setPrevButtonDisabled(true)
        } else {
            setPrevButtonDisabled(false)
        }
    }
    const checkNextButton = () => {
        if(isLast){
            setNextButtonDisabled(true)
        } else {
            setNextButtonDisabled(false)
        }
    }

    useEffect( () => {
        checkPrevButton()
        checkNextButton()
    }, [currentPage, isLast])

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

    const fetchSubsequentData = async (pageNo) => {
        let response = await getContactsSubsequentRequest(pageNo);
        await addContactsToState(response.content);
        setCurrentPage(response.pageNo);
        setTotalPages(response.totalPages);
        setIsLast(response.last)
    }

    const handlePreviousButton = async () => {
        await fetchSubsequentData(currentPage-1)
    }
    const handleNextButton = async () => {
        await fetchSubsequentData(currentPage +1)
    }
    const handlePageButton = async (index) => {
        await fetchSubsequentData(index)
    }
    const generatePagesButtons = () => {
        let buttons = [];
        for(let i = 0; i < totalPages; i++){
            buttons = [...buttons, <button key={i} onClick={() => handlePageButton(i)}>{i}</button>]
        }
        return buttons;
    }

    return (
        <div className="contacts-container">
            <div className={"contacts-container-header"}>
                <span><h1>Kontakty</h1></span>
                <span className={"contacts-container-header-pagination"}>
                   <button onClick={handlePreviousButton} disabled={prevButtonDisabled}>poprzednia</button>
                   <h6>{generatePagesButtons()}</h6>
                   <button onClick={handleNextButton} disabled={nextButtonDisabled}>kolejna</button></span>
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