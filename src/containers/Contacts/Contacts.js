import {connect} from "react-redux";
import Contacts from "../../components/Contacts/Contacts";
import {addContactsToState, addSingleContact} from "../../redux/actions/contacts";
import {addContactsPaginationToState} from "../../redux/actions/contactsPagination";


const mapStateToProps = (state) => {
    return {
        contacts :state.contacts,
        pagination: state.contactsPagination,
        auth: state.auth

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addContactsToState: (contacts) => dispatch(addContactsToState(contacts)),
        addContactToState: (contact) => dispatch(addSingleContact(contact)),
        addPagination: pagination => dispatch(addContactsPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)