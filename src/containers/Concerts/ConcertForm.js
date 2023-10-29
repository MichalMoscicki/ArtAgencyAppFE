import {connect} from "react-redux";
import ConcertForm from "../../components/Concerts/ConcertForm";
import {addSingleConcertToState} from "../../redux/actions/concerts";


const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        musicians: state.musicians,
        songs: state.songs,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addConcertsToState: (concert) => dispatch(addConcertsToState(concert)),
        addSingleConcertToState: (concert) => dispatch(addSingleConcertToState(concert))
        // addInstrumentsToState: (instruments) => dispatch(addInstrumentsToState(instruments)),
        // addPagination: pagination => dispatch(addSongsPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcertForm)