import React from "react";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import "./Layout.css"
import {Sidebar} from "./SideBar";


export const Layout = () => {
    return (
        <>
            <section>
                <div className="layout text-2x1">
                    <div className="navbar centered">
                        <Navbar/>
                    </div>
                    <div className="sidebar centered">
                        <Sidebar/>
                    </div>
                    <div className="outlet">
                        <Outlet/>
                    </div>
                </div>
            </section>
        </>
    )
}

