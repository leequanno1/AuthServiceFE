import React from "react";
import "./AccountAccessControl.css";
import UserTable from "../../compine-components/Table/UserTable/UserTable";
import MiniProfile from "../../compine-components/SectionPart/MiniProfile/MiniProfile";
import Button from "../../components/Button/Button";
import MiniPolicyInfo from "../../compine-components/SectionPart/MiniPolicyInfo/MiniPolicyInfo";

const AccountAccessControl = () => {
  return (
    <div className="aac-container">
      <div className="acc-header">
        <h1>Account Access Control</h1>
        <Button label="+ Add new user" tyle="tertiary" borderRadius={3} onClick={() => {}} />
      </div>
      <div className="acc-body">
          <UserTable />
          <div className="aac-right-container">
            <MiniProfile />
            <MiniPolicyInfo />
          </div>
        </div>
    </div>
  );
};

export default AccountAccessControl;
