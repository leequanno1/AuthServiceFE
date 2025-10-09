import React from "react";
import "./AccountAccessControl.css"
import UserTable from "../../compine-components/Table/UserTable/UserTable";
import MiniProfile from "../../compine-components/SectionPart/MiniProfile/MiniProfile";
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";

const AccountAccessControl = () => {
    return (
        <div className="aac-container">
            <UserTable />
            <div className="aac-right-container">
                <MiniProfile />
                <MiniPoolInfo />
            </div>
        </div>
    );
}

export default AccountAccessControl;