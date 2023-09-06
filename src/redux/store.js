import {applyMiddleware, createStore} from "redux";
import reducer from "../redux/reducers/index";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
