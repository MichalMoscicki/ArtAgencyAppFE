import {combineReducers} from "redux";
import {contacts} from "./contacts";
import {contactsPagination} from "./contactsPagination";
import {tasks} from "./tasks";
import {tasksPagination} from "./taskPagination";
import {auth} from "./auth";


export default combineReducers({
    contacts,
    contactsPagination,
    tasks,
    tasksPagination,
    auth
})