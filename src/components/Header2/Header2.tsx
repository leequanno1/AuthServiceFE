import React from "react";
import "./Header2.css";
import IconButton from "../IconButton/IconButton";
import { Gear } from "phosphor-react";
import { CaretDownFill } from "react-bootstrap-icons";

const Header2: React.FC = () => {

    const [username, setUsername] = React.useState<string>("username");
    const [shortyId, setShortyId] = React.useState<string>("shorty-id");
    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

    return (
        <header>
            <h1 className="app-logo">Authify</h1>
            <div className="head-left-container" >
                <IconButton Icon={Gear} IconSize={30} onClick={ () => {}}/>
                <div className="vertical-line"></div>
                <div className="profile-container" onClick={() => {setIsExpanded(!isExpanded)}}>
                    <div>
                        <span className="username">{username}</span>
                        /
                        <span className="shorty-id">{shortyId}</span>
                    </div>
                    <CaretDownFill className={`expandable ${isExpanded? "expanded": ""}`} size={12} color="var(--text-color)" />
                </div>
            </div>
        </header>
    );
}

export default Header2;