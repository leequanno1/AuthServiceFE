import "./UserPoolTable.css";
import {
  ArrowClockwise,
  DotsThreeOutlineVertical,
  Trash,
} from "phosphor-react";
import IconButton from "../../../components/IconButton/IconButton";
import React, { useEffect, useRef, useState } from "react";
import TableRow from "./TableRow/TableRow";
import { UserPool } from "../../../entities/user-pool";
import { UserPoolPolicies } from "../../../entities/user-pool-policies";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";

interface UserPoolTableProps {
  tableName?: string;
}

const UserPoolTable: React.FC<UserPoolTableProps> = ({
  tableName = "User Pool Table",
}) => {
  const userPools: UserPool[] = [
    {
      poolId: "1",
      poolName: "Pool One",
      createdAt: new Date("2023-01-01"),
      account: { rootId: "admin" },
      userFields: ["username", "email", "phone"],
      authorizeFields: ["role", "department"],
    },
    {
      poolId: "2",
      poolName: "Pool Two",
      createdAt: new Date("2023-01-01"),
      account: { rootId: "admin" },
      userFields: ["username", "email", "phone"],
      authorizeFields: ["role", "department"],
    },
    {
      poolId: "3",
      poolName: "Pool Three",
      createdAt: new Date("2023-01-01"),
      account: { rootId: "admin" },
      userFields: ["username", "email", "phone"],
      authorizeFields: ["role", "department"],
    },
    {
      poolId: "4",
      poolName: "Pool Four",
      createdAt: new Date("2023-01-01"),
      account: { rootId: "admin" },
      userFields: ["username", "email", "phone"],
      authorizeFields: ["role", "department"],
    },
  ];

  const poolPolicies: UserPoolPolicies = {
    
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Tính toán trạng thái của header
  const allSelected =
    selectedIds.length === userPools.length && userPools.length > 0;
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
    setSelectedIds(
      e.target.checked ? userPools.map((d) => d.poolId ?? "") : []
    );
  };

  // Toggle 1 row
  const handleRowToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="pool-table-container">
      <div className="pool-table-name-box">
        {/* Table name session */}
        <h2 className="pool-table-name">{tableName}</h2>
        <div className="action-container">
          {/* TODO: add icon button here */}
          <IconButton Icon={Trash} onClick={() => {}} />
          <IconButton Icon={ArrowClockwise} onClick={() => {}} />
          <DropdownButton
            items={[
              {
                label: "Go to feature",
                onClick: () => {
                  window.open("/account-control", "_blank");
                },
              },
            ]}
            children={
              <IconButton Icon={DotsThreeOutlineVertical} onClick={() => {}} />
            }
          />
        </div>
      </div>

      {/* Table body */}
      <div className="main-table">
        {/* Table head */}
        <div className="pool-table-head">
          <div className="pool-table-head-item">
            <input
              ref={headerRef}
              type="checkbox"
              id="chkAll"
              checked={allSelected}
              onChange={handleToggleAll}
            />
          </div>
          <div className="pool-table-head-item">Pool name</div>
          <div className="pool-table-head-item">Access range</div>
          <div className="pool-table-head-item">Created by/Date</div>
        </div>
        {/* Table body */}
        <div className="pool-table-body">
          {/* Table rows */}

          {userPools.map((pool) => (
            <TableRow
              key={pool.poolId}
              pool={pool}
              poolPolicies={poolPolicies}
              isChecked={selectedIds.includes(pool.poolId ?? "")}
              onCheckedChange={() => handleRowToggle(pool.poolId ?? "")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPoolTable;
