import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {Layout} from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import Contacts from "./components/Contacts/Contacts";
import Tasks from "./components/Tasks/Tasks";
import API from "./components/Contacts/API";

function App() {
    return (
        <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/api" element={<API/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path="/tasks" element={<Tasks/>}/>
                        </Route>
                    </Routes>
                </div>
        </BrowserRouter>
    );
}

export default App;
