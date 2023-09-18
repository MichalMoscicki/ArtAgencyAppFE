import {connect} from "react-redux";
import SingleContact from "../../components/Contacts/SingleContact";
import {removeContact} from "../../redux/actions/contacts";
const mapDispatchToProps = (dispatch) => {
    return{
        removeContact: (contacts) => dispatch(removeContact(contacts)),
    }
}

export default connect(null, mapDispatchToProps)(SingleContact)
