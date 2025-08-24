import React, { useEffect, useRef, useState } from "react";
import "./UserTable.css";
import Account from "../../../entities/account";
import TableRow from "./TableRow/TableRow";
import IconButton from "../../../components/IconButton/IconButton";
import { ArrowClockwise, DotsThreeOutlineVertical, Trash } from "phosphor-react";

interface UserTableProps {
  tableTitle?: string;
}

const UserTable: React.FC<UserTableProps> = ({
  tableTitle = "User List",
}) => {

  let accounts : Account[] = [
    {
      accountId: "1",
      displayName: "User One",
      username: "user1",
      parentId: "admin",
      createdAt: new Date("2023-01-01"),
    },
    {
      accountId: "2",
      displayName: "User Two",
      username: "user2",
      parentId: "admin",
      createdAt: new Date("2023-01-01"),
    },
    {
      accountId: "3",
      displayName: "User three",
      username: "user3",
      parentId: "admin",
      createdAt: new Date("2023-01-01"),
    },
    {
      accountId: "4",
      displayName: "User Four",
      username: "user4",
      parentId: "admin",
      createdAt: new Date("2023-01-01"),
    },
  ]

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Tính toán trạng thái của header
  const allSelected = selectedIds.length === accounts.length && accounts.length > 0;
  const someSelected = selectedIds.length > 0 && !allSelected;

  // Ref cho checkbox header
  const headerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  // Toggle tất cả
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? accounts.map(d => d.accountId??"") : []);
  };

  // Toggle 1 row
  const handleRowToggle = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="tatle-container">
      <div className="table-name-box">
        {/* Table name session */}
        <h2 className="table-name">{tableTitle}</h2>
        <div className="action-container">
          {/* TODO: add icon button here */}
          <IconButton  Icon={Trash} onClick={() => {}}/>
          <IconButton  Icon={ArrowClockwise} onClick={() => {}}/>
          <IconButton  Icon={DotsThreeOutlineVertical} onClick={() => {}}/>
        </div>
      </div>

      {/* Table body */}
      <div className="main-table">
        {/* Table head */}
        <div className="table-head">
          <div className="table-head-item">
            <input 
              ref={headerRef}
              type="checkbox" 
              id="chkAll" 
              checked={allSelected} 
              onChange={handleToggleAll}/>
          </div>
          <div className="table-head-item">Name/Username</div>
          <div className="table-head-item">Created by/Date</div>
        </div>
        {/* Table body */}
        <div className="table-body">
          {/* Table rows */}
          
          {accounts.map((acc) => (
            <TableRow 
              key={acc.accountId} 
              account={acc} 
              isChecked={selectedIds.includes(acc.accountId??"")} 
              onCheckedChange={() => handleRowToggle(acc.accountId??"")}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTable;