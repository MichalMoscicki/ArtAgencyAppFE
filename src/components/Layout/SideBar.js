import React from 'react';
import {NavLink} from "react-router-dom";
import "./SideBar.css"


export const Sidebar = () => {
    return (
        <div className={"sidebar centered"}>
            <ul className={"sidebar ul"}>
                <li><NavLink to={"/"} className={"navlink"}>Zadania</NavLink></li>
                <li><NavLink to={"/contacts"} className={"navlink"}>Kontakty</NavLink></li>
                <li><NavLink to={"/songs"} className={"navlink"}>Repertuar</NavLink></li>
                <li><NavLink to={"/musicians"} className={"navlink"}>Muzycy</NavLink></li>
                <li><NavLink to={"/jobs"} className={"navlink"}>Zlecenia</NavLink></li>
            </ul>
        </div>

    );
};
