import React from "react";
import "./Drawer.css";
// import { List } from "react-bootstrap-icons";
import { List } from "phosphor-react";
import IconButton from "../IconButton/IconButton";
import { Link } from "react-router-dom";

const Drawer: React.FC = () => {

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <nav className={`app-drawer ${isOpen ? "open" : "close"}`}>
            {/* Button */}
            <div className="button-container">
                <IconButton Icon={List} IconWeight="bold" IconSize={25} onClick={() => {setIsOpen(!isOpen)}}/>
            </div>
            <div className="horizontal-line"></div>
            <div className="dw-name">Feature</div>
            {/* Menu Items */}
            <div className="dw-menu-items">
                <Link className="nav head-nav" to={"/console-home"}><h3>Profile</h3></Link>
                <Link className="nav head-nav" to={"/console-home"}><h3>Console Home</h3></Link>
                <Link className="nav head-nav" to={"/account-control"}><h3>Account Control</h3></Link>
                <Link className="nav sub-nav" to={"/account-control/create"}>Create sub-account</Link>
                <Link className="nav head-nav" to={"/pool-control"}><h3>Pool Control</h3></Link>
                <Link className="nav sub-nav" to={"/pool-control/create"}>Create new pool</Link>
            </div>
        </nav>
    );
}

export default Drawer;