
import {connect} from "react-redux";
import Contacts from "../../components/Contacts/Contacts";
import {addContactsToState, addSingleContact} from "../../redux/actions/contacts";


const mapStateToProps = (state) => {
    return {
        contacts :state.contacts
    }
}

//dispatch to props: get all, delete, add
const mapDispatchToProps = (dispatch) => {
    return{
        addContactsToState: (contacts) => dispatch(addContactsToState(contacts)),
        addContactToState: (contact) => dispatch(addSingleContact(contact))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)