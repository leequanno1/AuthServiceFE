import React from "react";
import "./ConsoleHome.css"
import Button from "../../components/Button/Button";
import UserPoolTable from "../../compine-components/Table/UserPoolTable/UserPoolTable";
import UserTable from "../../compine-components/Table/UserTable/UserTable";

const ConsoleHome: React.FC = () => {

    return (
        <div className="console-home-container">
            <div className="cs-header-container">
                <h1 className="cs-header">Console Home</h1>
                <Button label="+ Add new user" tyle="tertiary" borderRadius={3} onClick={() => {}}/>
                <Button label="+ Add new pool" tyle="tertiary" borderRadius={3} onClick={() => {}}/>
            </div>
            <div className="cs-table-container">
                <UserPoolTable tableName="Account Access Control"/>
                <UserTable tableTitle="User Pools Control"/>
            </div>
        </div>
    );
}

export default ConsoleHome;