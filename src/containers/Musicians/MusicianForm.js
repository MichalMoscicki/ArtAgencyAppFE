
import {connect} from "react-redux";
import MusicianForm from "../../components/Musicians/MusicianForm";
import {addSingleMusician, removeMusician, updateMusician} from "../../redux/actions/musicians";

const mapStateToProps = (state) => {
    return {
        musicians: state.musicians,
        instruments: state.instruments,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMusicianToState: (musician) => dispatch(addSingleMusician(musician)),
        updateMusicianInState: (musician) => dispatch(updateMusician(musician)),
        removeMusician: (musician) => dispatch(removeMusician(musician)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicianForm)