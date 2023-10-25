import {connect} from "react-redux";
import Instruments from "../../components/Musicians/Instruments";
import {
    addInstrumentsToState,
    addSingleInstrument,
    updateInstrument,
    removeInstrument
} from "../../redux/actions/instruments";

const mapStateToProps = (state) => {
    return {
        instruments: state.instruments,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addInstrumentsToState: (instruments) => dispatch(addInstrumentsToState(instruments)),
        addInstrumentToState: (instrument) => dispatch(addSingleInstrument(instrument)),
        updateInstrumentInState: (instrument) => dispatch(updateInstrument(instrument)),
        removeInstrument: (instrument) => dispatch(removeInstrument(instrument)),

        // addPagination: pagination => dispatch(addContactsPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)

