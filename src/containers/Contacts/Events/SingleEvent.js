import SingleEvent from "../../../components/Contacts/Events/SingleEvent";
import {connect} from "react-redux";
import {updateContact} from "../../../redux/actions/contacts";

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateContact: (contact) => dispatch(updateContact(contact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent)