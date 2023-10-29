import {connect} from "react-redux";
import Concerts from "../../components/Concerts/Concerts";
import {addMusiciansToState} from "../../redux/actions/musicians";
import {addSongsToState} from "../../redux/actions/songs";
import {addConcertsPaginationToState} from "../../redux/actions/concertPagination";
import {removeConcertFromState} from "../../redux/actions/concerts";

const mapStateToProps = (state) => {
    return {
        concerts: state.concerts,
        auth: state.auth,
        pagination: state.concertsPagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeConcertFromState: (concert) => dispatch(removeConcertFromState(concert)),
        addMusiciansToState: (musicians) => dispatch(addMusiciansToState(musicians)),
        addSongsToState: (songs) => dispatch(addSongsToState(songs)),
        addPagination: pagination => dispatch(addConcertsPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Concerts)