import React from "react";
import "./ConsoleHome.css"
import UserPoolTable from "../../compine-components/Table/UserPoolTable/UserPoolTable";
import UserTable from "../../compine-components/Table/UserTable/UserTable";
import LinkButton from "../../components/LinkButton/LinkButton";

const ConsoleHome: React.FC = () => {

    return (
        <div className="console-home-container">
            <div className="cs-header-container">
                <h1 className="cs-header">Console Home</h1>
                <LinkButton to="/account-control/create" label="+ Add new user" type="tertiary" borderRadius={3}/>
                <LinkButton to="/pool-control/create" label="+ Add new pool" type="tertiary" borderRadius={3} />
            </div>
            <div className="cs-table-container">
                <UserTable tableTitle="Account Access Control"/>
                <UserPoolTable tableName="User Pools Control"/>
            </div>
        </div>
    );
}

export default ConsoleHome;