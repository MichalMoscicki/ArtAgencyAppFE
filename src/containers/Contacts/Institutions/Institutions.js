import {updateContact} from "../../../redux/actions/contacts";
import {connect} from "react-redux";
import Institutions from "../../../components/Contacts/Institutions/Institutions";


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

export default connect(mapStateToProps, mapDispatchToProps)(Institutions)