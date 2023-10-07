import {connect} from "react-redux";
import {SingleTask} from "../../components/Tasks/SingleTask";
import {removeTask, updateTask} from "../../redux/actions/tasks";

const mapDispatchToProps = (dispatch) => {
    return{
        updateTaskInState: (task) => dispatch(updateTask(task)),
        removeTaskFromState: (task) => dispatch(removeTask(task))
    }
}

export default connect(null, mapDispatchToProps)(SingleTask)