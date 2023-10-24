import {connect} from "react-redux";
import {addTokenToState} from "../../redux/actions/auth";
import {Login} from "../../components/Auth/Login";

const mapDispatchToProps = (dispatch) => {
    return{
        addTokenToState: (token) => dispatch(addTokenToState(token))
    }
}
export default connect(null, mapDispatchToProps)(Login)