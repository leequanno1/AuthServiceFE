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
import accountService from "../../../services/account-service";
import poolPoliciesService from "../../../services/pool-policies-service";
import userPoolService from "../../../services/user-pool-service";
import userPoolStore from "../../../store/user-pool.store";
import userPoolPoliciesStore from "../../../store/user-pool-policies.store";
import accountStore from "../../../store/account.store";
import { api } from "../../../services/api-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";

interface UserPoolTableProps {
  tableName?: string;
  hideOptions?: boolean;
  onRowClick?: (row: UserPool | null) => void;
}

const UserPoolTable: React.FC<UserPoolTableProps> = ({
  tableName = "User Pool Table",
  hideOptions = false,
  onRowClick,
}) => {
  const [userPools, setUserPools] = React.useState<UserPool[]>([]);

  const [poolPolicies, setPoolPolicies] = React.useState<
    Map<string, UserPoolPolicies>
  >(new Map());

  const [currentRowClick, setCurrentRowClick] = React.useState<UserPool | null>(
    null
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [counter, setCounter] = useState<number>(0);

  const isRoot = accountService.isRoot();

  const rootAccount = accountStore.getState().rootAccount;

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

  useEffect(() => {
    const initData = async () => {
      try {
        await userPoolService.refreshUserPool();
        setUserPools(userPoolStore.getState().userPools);
        if (!isRoot) {
          await poolPoliciesService.refreshPoolPolicies();
          setPoolPolicies(
            userPoolPoliciesStore.getState().userPoolPoliciesMapByPoolID
          );
        }
        if (!rootAccount) {
          await accountService.getRootDetails();
        }
      } catch (error) {
        // TODO: show toast
      }
    };

    initData();
  }, [isRoot, rootAccount, counter]);

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
          {isRoot && (
            <ConfirmPopup
              onAccept={async () => {
                console.log(selectedIds);
                if (selectedIds.length > 0) {
                  try {
                    // success
                    await api.post("/user-pool/delete-many", selectedIds);
                    // refresh user-pool
                    await userPoolService.refreshUserPool();
                    // refresh policy
                    await poolPoliciesService.refreshPoolPolicies();

                    setUserPools(userPoolStore.getState().userPools);
                    setPoolPolicies(
                      userPoolPoliciesStore.getState().userPoolPoliciesMap
                    );
                    setSelectedIds([]);
                    if (onRowClick) {
                      onRowClick(null);
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
              children={
                <IconButton
                  title="Delete user pool(s)"
                  Icon={Trash}
                  onClick={() => {}}
                />
              }
            />
          )}
          <IconButton
            title="Refresh user pools"
            Icon={ArrowClockwise}
            onClick={() => {
              setCounter(counter + 1);
            }}
          />
          {!hideOptions && (
            <DropdownButton
              items={[
                {
                  label: "Go to feature",
                  onClick: () => {
                    window.open("/pool-control", "_blank");
                  },
                },
              ]}
              children={
                <IconButton
                  title="Options"
                  Icon={DotsThreeOutlineVertical}
                  onClick={() => {}}
                />
              }
            />
          )}
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
            <div
              onClick={() => {
                if (onRowClick && pool !== currentRowClick) {
                  setCurrentRowClick(pool);
                  onRowClick(pool);
                }
              }}
            >
              <TableRow
                // key={pool.poolId}
                pool={pool}
                poolPolicies={poolPolicies.get(pool.poolId ?? "")}
                isRoot={isRoot}
                rootUsername={rootAccount?.username}
                isChecked={selectedIds.includes(pool.poolId ?? "")}
                onCheckedChange={() => handleRowToggle(pool.poolId ?? "")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPoolTable;
