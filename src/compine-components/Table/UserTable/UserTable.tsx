import React, { useEffect, useRef, useState } from "react";
import "./UserTable.css";
import Account from "../../../entities/account";
import TableRow from "./TableRow/TableRow";
import IconButton from "../../../components/IconButton/IconButton";
import {
  ArrowClockwise,
  DotsThreeOutlineVertical,
  Trash,
} from "phosphor-react";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";
import accountStore from "../../../store/account.store";
import accountService from "../../../services/account-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import { AccountPolicies } from "../../../entities/account-policies";
import { accountPoliciesService } from "../../../services/account-policies-service";
import { toastService } from "../../../services/toast-service";

interface UserTableProps {
  tableTitle?: string;
  customAccounts?: Account[] | null;
  hideDelete?: boolean;
  hideRefresh?: boolean;
  hideOption?: boolean;
  onSelected?: (seletedAccount: Account) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  tableTitle = "User List",
  customAccounts = null,
  hideDelete = false,
  hideRefresh = false,
  hideOption = false,
  onSelected = () => {},
}) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const sessionAccount = accountStore.getState().account;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [crrAccountPlc, setCrrAccountPlc] = useState<AccountPolicies | null>(
    null
  );
  const [counter, setCounter] = useState<number>(1);
  // Tính toán trạng thái của header
  const allSelected =
    selectedIds.length === accounts.length && accounts.length > 0;
  const someSelected = selectedIds.length > 0 && !allSelected;

  // Ref cho checkbox header
  const headerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  useEffect(() => {
    const initAcocuntDatas = async () => {
      try {
        if (!accountService.isRoot()) {
          const tmpPlc = await accountPoliciesService.getAccountPolicies(
            accountStore.getState().account?.accountId ?? ""
          );
          setCrrAccountPlc(tmpPlc);
        }
        if (customAccounts === null) {
          await accountService.refreshSubAccount();
          const tempSubAccs = accountStore.getState().subAccounts;
          setAccounts(tempSubAccs ?? []);
        } else {
          setAccounts(customAccounts);
        }
      } catch (error) {
        toastService.error("An error occurred while loading account's data.");
      }
    };

    initAcocuntDatas();
  }, [customAccounts, counter]);

  // Toggle tất cả
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(
      e.target.checked ? accounts.map((d) => d.accountId ?? "") : []
    );
  };

  // Toggle 1 row
  const handleRowToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="tatle-container">
      <div className="table-name-box">
        {/* Table name session */}
        <h2 className="table-name">{tableTitle}</h2>
        <div className="action-container">
          {/* add icon button here */}
          {!hideDelete &&
            (accountService.isRoot() || !!crrAccountPlc?.canDelete) && (
              <ConfirmPopup
                onAccept={async () => {
                  await accountService.deleteAccountById(selectedIds, true);
                  setAccounts(
                    accounts.filter(
                      (acc) => !selectedIds.some((id) => id === acc.accountId)
                    )
                  );
                  setSelectedIds([]);
                }}
                children={
                  <IconButton
                    title="Delete Sub-user(s)"
                    Icon={Trash}
                    onClick={() => {}}
                  />
                }
              />
            )}
          {!hideRefresh && (
            <IconButton
              title="Refresh Sub-users"
              Icon={ArrowClockwise}
              onClick={() => {
                setCounter(counter + 1);
              }}
            />
          )}
          {!hideOption && (
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
        <div className="table-head">
          <div className="table-head-item">
            <input
              ref={headerRef}
              type="checkbox"
              id="chkAll"
              checked={allSelected}
              onChange={handleToggleAll}
            />
          </div>
          <div className="table-head-item">Name/Username</div>
          <div className="table-head-item">Created by/Date</div>
        </div>
        {/* Table body */}
        <div className="table-body">
          {/* Table rows */}

          {accounts.map((acc) => (
            <TableRow
              parentAcc={sessionAccount}
              account={acc}
              onClick={(r) => {
                onSelected(r);
              }}
              onSubRowClick={(sr) => {
                onSelected(sr);
              }}
              isChecked={selectedIds.includes(acc.accountId ?? "")}
              onCheckedChange={() => handleRowToggle(acc.accountId ?? "")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
