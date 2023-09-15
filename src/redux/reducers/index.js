import {combineReducers} from "redux";
import {contacts} from "./contacts";
import {contactsPagination} from "./contactsPagination";


export default combineReducers({
    contacts,
    contactsPagination
})