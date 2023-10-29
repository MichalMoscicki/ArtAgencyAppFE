import {connect} from "react-redux";
import {addTokenToState} from "../../redux/actions/auth";
import {Login} from "../../components/Auth/Login";
import {addConcertsToState} from "../../redux/actions/concerts";
import {addConcertsPaginationToState} from "../../redux/actions/concertPagination";
import {addContactsToState} from "../../redux/actions/contacts";
import {addContactsPaginationToState} from "../../redux/actions/contactsPagination";
import {addInstrumentsToState} from "../../redux/actions/instruments";
import {addMusiciansToState} from "../../redux/actions/musicians";
import {addMusiciansPaginationToState} from "../../redux/actions/musiciansPagination";
import {addSongsToState} from "../../redux/actions/songs";
import {addSongsPaginationToState} from "../../redux/actions/songsPagination";
import {addTasksToState} from "../../redux/actions/tasks";
import {addTasksPaginationToState} from "../../redux/actions/taskPagination";

const mapDispatchToProps = (dispatch) => {

    return{
        addTokenToState: (token) => dispatch(addTokenToState(token)),
        addConcertsToState: (songs) => dispatch(addConcertsToState(songs)),
        addConcertsPaginationToState: (pagination) => dispatch(addConcertsPaginationToState(pagination)),
        addContactsToState: (contacts) => dispatch(addContactsToState(contacts)),
        addContactsPaginationToState: (pagination) => dispatch(addContactsPaginationToState(pagination)),
        addInstrumentsToState: (instruments) => dispatch(addInstrumentsToState((instruments))),
        addMusiciansToState: (musicians) => dispatch(addMusiciansToState(musicians)),
        addMusiciansPaginationToState: (pagination) => dispatch(addMusiciansPaginationToState(pagination)),
        addSongsToState: (songs) => dispatch(addSongsToState(songs)),
        addSongsPagination: pagination => dispatch(addSongsPaginationToState(pagination)),
        addTasksToState: (tasks) => dispatch(addTasksToState(tasks)),
        addTaskPagination: pagination => dispatch(addTasksPaginationToState(pagination))



        //songs + pagination
        //tasks + pagination





    }
}
export default connect(null, mapDispatchToProps)(Login)