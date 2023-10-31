import {connect} from "react-redux";
import Tasks from "../../components/Tasks/Tasks";
import {addSingleTask, addTasksToState} from "../../redux/actions/tasks";
import {addTasksPaginationToState} from "../../redux/actions/taskPagination"

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks,
        pagination: state.contactsPagination,
        contacts: state.contacts,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTasksToState: (tasks) => dispatch(addTasksToState(tasks)),
        addTaskToState: (task) => dispatch(addSingleTask(task)),
        addPagination: pagination => dispatch(addTasksPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)