import React from "react";
import "./StartScreen.css";
import Header1 from "../../components/Header1/Header1";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const StartScreen: React.FC = () => {
    
    return (
        <>
            <Header1/>
            <main className="start-screen-container">
                <div className="panel">
                    <h1 className="pn-logo">Authify</h1>
                    <h2 className="pn-bold">Secure access. Simplified.</h2>
                    <span className="pn-text">Authify provides seamless authentication integration for any external system via modern protocols.</span>
                    <div className="pn-shapes">
                        <div className="pn-shape pn-circle"></div>
                        <div className="pn-shape pn-triangle"></div>
                        <div className="pn-shape pn-square"></div>
                    </div>
                    <span className="pn-text">© 2025 Authify Inc. All rights reserved.</span>
                </div>
                <div className="form-container">
                    <Outlet />
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default StartScreen;