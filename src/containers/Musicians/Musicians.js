import {connect} from "react-redux";
import {addMusiciansToState, addSingleMusician, removeMusician, updateMusician} from "../../redux/actions/musicians";
import Musicians from "../../components/Musicians/Musicians";
import {addInstrumentsToState} from "../../redux/actions/instruments";
import {addMusiciansPaginationToState} from "../../redux/actions/musiciansPagination";

const mapStateToProps = (state) => {
    return {
        musicians: state.musicians,
        instruments: state.instruments,
        auth: state.auth,
        pagination: state.musiciansPagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMusiciansToState: (musicians) => dispatch(addMusiciansToState(musicians)),
        addMusicianToState: (musician) => dispatch(addSingleMusician(musician)),
        updateMusicianInState: (musician) => dispatch(updateMusician(musician)),
        removeMusician: (musician) => dispatch(removeMusician(musician)),
        addInstrumentsToState: (instruments) => dispatch(addInstrumentsToState(instruments)),
        addPagination: pagination => dispatch(addMusiciansPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Musicians)