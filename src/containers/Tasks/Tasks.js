import {connect} from "react-redux";
import Tasks from "../../components/Tasks/Tasks";
import {addSingleTask, addTasksToState} from "../../redux/actions/tasks";
//import {addContactsPaginationToState} from "../../redux/actions/contactsPagination";


const mapStateToProps = (state) => {
    return {
        tasks : state.tasks,
        // pagination: state.contactsPagination
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTasksToState: (tasks) => dispatch(addTasksToState(tasks)),
        addTaskToState: (task) => dispatch(addSingleTask(task))
        // addPagination: pagination => dispatch(addContactsPaginationToState(pagination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)