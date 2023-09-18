import {updateContact} from "../../../redux/actions/contacts";
import {connect} from "react-redux";
import ContactPeople from "../../../components/Contacts/ContactPeople/ContactPeople";

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

export default connect(mapStateToProps, mapDispatchToProps)(ContactPeople)