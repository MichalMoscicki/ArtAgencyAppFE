import {connect} from "react-redux";
import Concerts from "../../components/Concerts/Concerts";
import {addConcertsPaginationToState} from "../../redux/actions/concertPagination";
import {addConcertsToState, removeConcertFromState} from "../../redux/actions/concerts";

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
        addPagination: pagination => dispatch(addConcertsPaginationToState(pagination)),
        addConcertsToState: (concerts) => dispatch(addConcertsToState(concerts)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Concerts)