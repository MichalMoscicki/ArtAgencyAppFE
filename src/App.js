import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./containers/Layout/Layout";
import Contacts from "./containers/Contacts/Contacts";
import ContactDetails from "./containers/Contacts/ContactDetails";
import Tasks from "./containers/Tasks/Tasks";
import store from "./redux/store";
import Login from "./containers/Auth/Login";
import Musicians from "./components/Musicians/Musicians";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/" element={<Tasks/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path='/contacts/:contactId' element={<ContactDetails/>}/>
                            <Route path="/musicians" element={<Musicians/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
