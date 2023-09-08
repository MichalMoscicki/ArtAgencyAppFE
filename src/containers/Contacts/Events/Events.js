import Events from "../../../components/Contacts/Events/Events";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        contacts :state.contacts
    }
}

export default connect(mapStateToProps)(Events)