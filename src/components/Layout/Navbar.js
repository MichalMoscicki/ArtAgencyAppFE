import React from 'react';
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className={"nav"}>
            <a className={"site-title"}>ArtAgencyApp</a>
            <ul>
                <li><a href={"/login"}>Wyloguj</a> </li>
            </ul>
        </nav>
    )};

export default Navbar;