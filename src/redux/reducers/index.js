import {combineReducers} from "redux";
import {contacts} from "./contacts";
import {contactsPagination} from "./contactsPagination";
import {tasks} from "./tasks";
import {tasksPagination} from "./taskPagination";
import {auth} from "./auth";
import {instruments} from "./instruments";
import {musicians} from "./musicians";
import {musiciansPagination} from "./musiciansPagination";
import {songs} from "./songs";
import {songsPagination} from "./songsPagination";
import {concerts} from "./concerts";
import {concertsPagination} from "./concertsPagination";


export default combineReducers({
    concerts,
    concertsPagination,
    contacts,
    contactsPagination,
    tasks,
    tasksPagination,
    auth,
    instruments,
    musicians,
    musiciansPagination,
    songs,
    songsPagination,
})