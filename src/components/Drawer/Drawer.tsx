import React from "react";
import "./Drawer.css";
// import { List } from "react-bootstrap-icons";
import { List } from "phosphor-react";
import IconButton from "../IconButton/IconButton";

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
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                <br/>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                <br/>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
        </nav>
    );
}

export default Drawer;