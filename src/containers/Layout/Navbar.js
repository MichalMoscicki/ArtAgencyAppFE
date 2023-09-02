import React from 'react';
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className={"nav"}>
            <a href={"/"} className={"site-title"}>ArtAgencyApp</a>
            <ul>
                <li><a href={"/contacts"}>Kontakty</a> </li>
                <li><a href={"/tasks"}>Zadania</a> </li>
                <li><a href={"/logout"}>Wyloguj</a> </li>
            </ul>
        </nav>
    )};


export default Navbar;