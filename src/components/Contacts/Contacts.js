import React from "react";
import {useState, useEffect} from "react";
import {addContact, exportContacts, getContactsInitialRequest, getContactsSubsequentRequest,} from "../../api/contacts";
import {SORT_DIR_ASC, SORT_DIR_DESC, SORT_BY_TITLE, SORT_BY_UPDATED} from "../../api/constans"
import SingleContact from "../../containers/Contacts/SingleContact";
import "./Contacts.css"

const Contacts = ({contacts, pagination, addContactsToState, addContactToState, addPagination, auth}) => {
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)

    const [contactName, setContactName] = useState("");
    const [alreadyCooperated, setAlreadyCooperated] = useState(false);
    const [formHidden, setFormHidden] = useState(true);

    const [sortBy, setSortBy] = useState("");
    const [sortDir, setSortDir] = useState("");
    const [pageNo, setPageNo] = useState(0);

    const TITLE_ASC = "TITLE_ASC"
    const TITLE_DESC = "TITLE_DESC"
    const UPDATED_ASC = "UPDATED_ASC"
    const UPDATED_DESC = "UPDATED_DESC"
    const handleSelect = (e) => {

        switch (e.target.value) {
            case TITLE_DESC:
                setSortBy(SORT_BY_TITLE);
                setSortDir(SORT_DIR_DESC);
                break
            case TITLE_ASC:
                setSortBy(SORT_BY_TITLE);
                setSortDir(SORT_DIR_ASC);
                break
            case UPDATED_DESC:
                setSortBy(SORT_BY_UPDATED);
                setSortDir(SORT_DIR_DESC);
                break
            case UPDATED_ASC:
                setSortBy(SORT_BY_UPDATED);
                setSortDir(SORT_DIR_ASC);
                break
            default:
                return
        }
    }

    useEffect(() => {
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
    useEffect(() => {
        const fetchSubsequentData = async () => {
            let response = await getContactsSubsequentRequest(pageNo, sortBy, sortDir, auth);
            await addContactsToState(response.content);
            await addPagination({
                pageNo: response.pageNo,
                pageSize: response.pageSize,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last
            })
        }

        fetchSubsequentData()
    }, [sortDir, sortBy, pageNo])

    const onSubmit = async (e) => {
        e.preventDefault();
        const contact = {title: contactName, alreadyCooperated: alreadyCooperated}
        let response = await addContact(contact, auth);
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
    const handlePageButton = (index) => {
        setPageNo(index)
    }
    const generatePagesButtons = () => {
        let buttons = [];
        for (let i = 0; i < pagination.totalPages; i++) {
            buttons = [...buttons, <button key={i} onClick={() => handlePageButton(i)}>{i}</button>]
        }
        return buttons;
    }
    const handleExport = async () => {

        const exportData = (data, fileName, type) => {
            const blob = new Blob([data], {type});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
        const response = await exportContacts(auth);
        exportData(JSON.stringify(response), "contacts.json", 'application/json');
    }

    return (
        <div className="contacts-container">
            <div className={"contacts-container-header"}>
                <span><h1>Kontakty</h1></span>
                <span className={"contacts-container-header-pagination"}>
                    <select onChange={handleSelect}>
                        <option value={UPDATED_DESC}>Data aktualizacji: od najnowszych</option>
                        <option value={UPDATED_ASC}>Data aktualizacji: od najstarszych</option>
                        <option value={TITLE_ASC}>Nazwa: rosnąco</option>
                        <option value={TITLE_DESC}>Nazwa: malejąco</option>
                    </select>
                </span>
            </div>
            <ul className={"contacts-list"}>
                {contacts.map((el, index) => {
                    return (<SingleContact contact={el} key={index}/>)
                })}
            </ul>
            <div className={"contacts-container-footer"}>
                <span>
                     <h3 onClick={toggleForm} className={"add-contact"}>Dodaj kontakt</h3>
                </span>
                <span>
                     <h6 onClick={handleExport} className={"add-contact"}>Exportuj kontakty - admin only</h6>
                </span>
                <span>
                    <ul>
                        <li>
                            <button onClick={() => handlePageButton(pagination.pageNo - 1)}
                                    disabled={prevButtonDisabled}>poprzednia</button>
                        </li>
                        <li>
                            {generatePagesButtons()}
                        </li>
                        <li>
                            <button onClick={() => handlePageButton(pagination.pageNo + 1)}
                                    disabled={nextButtonDisabled}>kolejna</button>
                        </li>
                    </ul>

                </span>

            </div>

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