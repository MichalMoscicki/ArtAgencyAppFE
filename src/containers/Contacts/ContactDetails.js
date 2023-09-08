import {connect} from "react-redux";
import ContactDetails from "../../components/Contacts/ContactDetails";


// const mapDispatchToProps = (dispatch) => {
//     return{
//        // updateContact: (contact) => dispatch(updateContact(contact)),
//     }
// }

export default connect()(ContactDetails)
