import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import Contacts from "./containers/Contacts/Contacts";
import ContactDetails from "./containers/Contacts/ContactDetails";
import Tasks from "./containers/Tasks/Tasks";
import store from "./redux/store";
import Login from "./containers/Auth/Login";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/main" element={<Main/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path='/contacts/:contactId' element={<ContactDetails/>}/>
                            <Route path="/tasks" element={<Tasks/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
