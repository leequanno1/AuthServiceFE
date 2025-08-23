import React from "react";

interface UserTableProps {
  tableTitle?: string;
}

const UserTable: React.FC<UserTableProps> = ({
  tableTitle = "User List",
}) => {

  return (
    <div className="tatle-container">
      <div className="table-name-box">
        {/* Table name session */}
        <h2 className="table-name">{tableTitle}</h2>
        <div className="action-container">
          {/* TODO: add icon button here */}
        </div>

        {/* Table body */}
        <div className="main-table">
          {/* Table head */}
          <div className="table-head"></div>
          {/* Table body */}
          <div className="table-body">
            {/* Table rows */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;