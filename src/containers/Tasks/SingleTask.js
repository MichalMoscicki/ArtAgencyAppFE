import {connect} from "react-redux";
import {SingleTask} from "../../components/Tasks/SingleTask";
import {removeTask, updateTask} from "../../redux/actions/tasks";

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateTaskInState: (task) => dispatch(updateTask(task)),
        removeTaskFromState: (task) => dispatch(removeTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)