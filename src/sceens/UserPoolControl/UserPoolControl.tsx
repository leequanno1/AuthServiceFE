import React, { useState } from "react";
import "./UserPoolControl.css";
import UserPoolTable from "../../compine-components/Table/UserPoolTable/UserPoolTable";
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";
import LinkButton from "../../components/LinkButton/LinkButton";
import { UserPool } from "../../entities/user-pool";

const UserPoolControl: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<UserPool | null>(null);

  return (
    <div className="user-pool-control-container">
      <div className="upc-header">
        <h1>User Pools Control</h1>
        <LinkButton
          to="/pool-control/create"
          label="+ Add new pool"
          type="tertiary"
          borderRadius={3}
        />
      </div>

      <div className="scrollable-content">
        <UserPoolTable
          hideOptions
          tableName="User Pools Control"
          onRowClick={(row) => setSelectedRow(row)}
        />

        <MiniPoolInfo userPool={selectedRow} />
      </div>
    </div>
  );
};

export default UserPoolControl;
