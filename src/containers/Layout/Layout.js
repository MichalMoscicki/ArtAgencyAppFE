import {connect} from "react-redux";
import {Layout} from "../../components/Layout/Layout";


const mapStateToProps = (state) => {
    return {
        auth :state.auth,
    }
}

export default connect(mapStateToProps, null)(Layout)