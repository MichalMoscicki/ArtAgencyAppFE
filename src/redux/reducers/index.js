import {combineReducers} from "redux";
import {contacts} from "./contacts";
import {contactsPagination} from "./contactsPagination";
import {tasks} from "./tasks";


export default combineReducers({
    contacts,
    contactsPagination,
    tasks
})