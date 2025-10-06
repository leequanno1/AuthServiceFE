import React from "react";
import "./Frame.css";
import Header2 from "../../components/Header2/Header2";
import Drawer from "../../components/Drawer/Drawer";
import { Outlet } from "react-router-dom";

const Frame: React.FC = () => {

    return (
        <>
            <Header2/>
            <div className="frame-container">
                <Drawer/>
                <Outlet/>
            </div >
        </>
    );
}

export default Frame;