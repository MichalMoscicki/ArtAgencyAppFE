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
import Musicians from "./containers/Musicians/Musicians";
import Songs from "./containers/Songs/Songs";
import Concerts from "./containers/Concerts/Concerts";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/tasks" element={<Tasks/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path='/contacts/:contactId' element={<ContactDetails/>}/>
                            <Route path="/musicians" element={<Musicians/>}/>
                            <Route path="/songs" element={<Songs/>}/>
                            <Route path="/concerts" element={<Concerts/>}/>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
        </LocalizationProvider>
    );
}

export default App;
