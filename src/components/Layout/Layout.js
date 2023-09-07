import React from "react";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import "./Layout.css"


export const Layout = () => {
    return (
        <>
            <section>
                <div className="layout text-2x1">
                    <div className="navbar centered">
                        <Navbar />
                    </div>
                    <div className="sidebar centered">
                        <h1>Sidebar</h1>
                    </div>
                    <div className="outlet">
                        <Outlet/>
                    </div>
                </div>
            </section>
        </>
    )
}

