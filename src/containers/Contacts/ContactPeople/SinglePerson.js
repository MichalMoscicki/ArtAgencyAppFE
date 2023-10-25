import {updateContact} from "../../../redux/actions/contacts";
import SinglePerson from "../../../components/Contacts/ContactPeople/SinglePerson";
import {connect} from "react-redux";

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

export default connect(mapStateToProps, mapDispatchToProps)(SinglePerson)