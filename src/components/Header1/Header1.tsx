import React from "react";
import "./Header1.css";
import { Link } from "react-router-dom";

const Header1: React.FC = () => {
    return (
        <header>
            <h1 className="app-logo"><Link className="app-logo" to={"/"}>Authify</Link></h1>
            <div className="header-nav-links">
                <Link className="link-item" to="about">About</Link>
                <Link className="link-item" to="docs">Docs</Link>
                <Link className="link-item" to="contact">Contact</Link>
            </div>
        </header>
    );
}

export default Header1;