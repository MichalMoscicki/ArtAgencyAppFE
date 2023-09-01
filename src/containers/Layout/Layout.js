import React from "react";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./SideBar";


export const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Sidebar/>

        </>
    )}

