import {connect} from "react-redux";
import ContactDetails from "../../components/Contacts/ContactDetails";
import {updateContact, addContactsToState, removeContact} from "../../redux/actions/contacts";

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (contacts) => dispatch(addContactsToState(contacts)),
        updateContact: (contact) => dispatch(updateContact(contact)),
        //to chyba nie potrzebne: jest po prostu przekierowanie do contacts
        deleteContact: (contact) => dispatch(removeContact(contact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
