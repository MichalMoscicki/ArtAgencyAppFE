import {connect} from "react-redux";
import ContactDetails from "../../components/Contacts/ContactDetails";
import {updateContact, removeContact} from "../../redux/actions/contacts";

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateContact: (contact) => dispatch(updateContact(contact)),
        removeContact: (contact) => dispatch(removeContact(contact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
