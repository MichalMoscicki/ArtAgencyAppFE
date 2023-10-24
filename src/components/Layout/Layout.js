import React from "react";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import "./Layout.css"
import {Sidebar} from "./SideBar";
import { Navigate } from "react-router-dom";


export const Layout = (auth) => {
    if(auth.auth === ""){
        return <Navigate replace to="/login" />;
    } else {
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
}

