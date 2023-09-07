import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import Contacts from "./components/Contacts/Contacts";
import ContactDetails from "./components/Contacts/ContactDetails";
import Tasks from "./components/Tasks/Tasks";
import API from "./components/Contacts/API";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/api" element={<API/>}/>
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
