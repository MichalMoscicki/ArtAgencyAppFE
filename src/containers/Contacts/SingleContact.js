import {connect} from "react-redux";
import SingleContact from "../../components/Contacts/SingleContact";
import {removeContact} from "../../redux/actions/contacts";

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        removeContact: (contacts) => dispatch(removeContact(contacts)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleContact)
