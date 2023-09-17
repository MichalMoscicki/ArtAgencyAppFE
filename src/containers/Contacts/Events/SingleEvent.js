import SingleEvent from "../../../components/Contacts/Events/Events";
import {connect} from "react-redux";
import {updateContact} from "../../../redux/actions/contacts";


const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateContact: (contact) => dispatch(updateContact(contact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent)