import {connect} from "react-redux";
import ConcertForm from "../../components/Concerts/ConcertForm";
import {addSingleConcertToState, updateConcertInState} from "../../redux/actions/concerts";

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
        addSingleConcertToState: (concert) => dispatch(addSingleConcertToState(concert)),
        updateConcertInState: (concert) => dispatch(updateConcertInState(concert))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcertForm)