import {connect} from "react-redux";
import Instruments from "../../components/Intruments/Instruments";
import {
    addInstrumentsToState,
    addSingleInstrument,
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
        removeInstrument: (instrument) => dispatch(removeInstrument(instrument)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)

