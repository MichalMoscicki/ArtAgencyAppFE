
import {connect} from "react-redux";
import AddMusicianForm from "../../components/Musicians/AddMusicianForm";
import {addMusiciansToState, addSingleMusician, removeMusician, updateMusician} from "../../redux/actions/musicians";

const mapStateToProps = (state) => {
    return {
        musicians: state.musicians,
        instruments: state.instruments,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMusiciansToState: (musicians) => dispatch(addMusiciansToState(musicians)),
        addMusicianToState: (musician) => dispatch(addSingleMusician(musician)),
        updateMusicianInState: (musician) => dispatch(updateMusician(musician)),
        removeMusician: (musician) => dispatch(removeMusician(musician)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMusicianForm)