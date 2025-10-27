import React from "react";
import "./AccessableUsers.css";
import Card from "../../../components/Card/Card";
import IconButton from "../../../components/IconButton/IconButton";
import {
  ArrowClockwise,
  DotsThreeVertical,
  MagnifyingGlass,
} from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import Account from "../../../entities/account";
import { DateService } from "../../../services/date-service";
import MiniPolicyTable from "../../../compine-components/Table/MiniPolicyTable/MiniPolicyTable";
import { useParams } from "react-router-dom";
import { UserPoolPolicies } from "../../../entities/user-pool-policies";
import accountService from "../../../services/account-service";
import userPoolPoliciesStore from "../../../store/user-pool-policies.store";
import accountStore from "../../../store/account.store";
import poolPoliciesService from "../../../services/pool-policies-service";
import { Policy } from "../../../entities/policies";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";

const AccessableUsers: React.FC = () => {
  const { poolID } = useParams();
  const [poolPolicies, setPoolPolicies] =
    React.useState<UserPoolPolicies | null>(null);
  const [subAccounts, setSubAccounts] = React.useState<Account[]>([]);
  const [currentSelectedSubAcc, setCurrentSelectedSubAcc] =
    React.useState<Account | null>(null);
  const [subUserPoolPoolicies, setSubUserPoolPolicies] =
    React.useState<UserPoolPolicies | null>(null);
  const [policyList, setPolicyList] = React.useState<Policy[]>([]);

  const isRoot = accountService.isRoot();
  const currentAccount = accountStore.getState().account;
  const [users, setUsers] = React.useState<Account[]>([]);

  React.useEffect(() => {
    const initData = async () => {
      if (!isRoot) {
        // load policy
        const tempPolicies = userPoolPoliciesStore
          .getState()
          .userPoolPoliciesMapByPoolID.get(poolID ?? "");
        if (tempPolicies) {
          setPoolPolicies(tempPolicies);
        }
      }
      const attachedAccounts = await accountService.getAttachedPoolPoliciesAccounts(currentAccount?.accountId??"", poolID??"");
      setUsers(attachedAccounts);
      await accountService.refreshSubAccount();
      setSubAccounts(accountStore.getState().subAccounts?.filter(item => !attachedAccounts.some(acc => acc.accountId === item.accountId)) ?? []);
    };

    initData();
  }, [currentAccount?.accountId, isRoot, poolID]);

  React.useEffect(() => {
    const initPolicyList = async () => {
      if (currentSelectedSubAcc) {
        // get subUserPoolPolicies
        const tempUPPS = await poolPoliciesService.getPolicyBySubAccountId(
          currentSelectedSubAcc.accountId ?? "",
          poolID ?? ""
        );
        setSubUserPoolPolicies(tempUPPS);
        setPolicyList(poolPoliciesService.initPoolPolicyList(tempUPPS));
      }
    };
    initPolicyList();
  }, [currentSelectedSubAcc, poolID]);

  function handleToggleAll(e: React.ChangeEvent<HTMLInputElement>) {
    const container = (e.currentTarget as HTMLElement).closest(
      ".user-table"
    ) as HTMLElement | null;
    if (!container) return;
    const checked = e.currentTarget.checked;
    const inputs = container.querySelectorAll<HTMLInputElement>(
      "input.user-row-checkbox"
    );
    inputs.forEach((i) => (i.checked = checked));
    // ensure indeterminate cleared when toggling all
    const master = container.querySelector<HTMLInputElement>(
      "input.master-checkbox"
    );
    if (master) master.indeterminate = false;
  }

  function handleRowToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const container = (e.currentTarget as HTMLElement).closest(
      ".user-table"
    ) as HTMLElement | null;
    if (!container) return;
    const all = container.querySelectorAll<HTMLInputElement>(
      "input.user-row-checkbox"
    );
    const checked = container.querySelectorAll<HTMLInputElement>(
      "input.user-row-checkbox:checked"
    );
    const master = container.querySelector<HTMLInputElement>(
      "input.master-checkbox"
    );
    if (!master) return;
    if (checked.length === 0) {
      master.checked = false;
      master.indeterminate = false;
    } else if (checked.length === all.length) {
      master.checked = true;
      master.indeterminate = false;
    } else {
      master.checked = false;
      master.indeterminate = true;
    }
  }

  function getCheckedUsers(): Account[] {
    const container = document.querySelector(
      ".user-table"
    ) as HTMLElement | null;
    if (!container) return [];
    const checkedInputs = container.querySelectorAll<HTMLInputElement>(
      "input.user-row-checkbox:checked"
    );
    const ids = Array.from(checkedInputs)
      .map((i) => i.dataset.userid)
      .filter(Boolean) as string[];
    return users.filter((u) => ids.includes(u.accountId ?? ""));
  }

  return (
    <div className="accessable-mng-container">
      <div className="amc-wrapper">
        <Card
          title="Accessible users"
          optionButtons={
            <>
              <IconButton
                onClick={() => {
                  console.log(getCheckedUsers());
                }}
                Icon={ArrowClockwise}
                IconSize={24}
              />
              <IconButton
                onClick={() => {}}
                Icon={DotsThreeVertical}
                IconWeight="bold"
                IconSize={24}
              />
            </>
          }
          content={
            <div className="au-content">
              {(isRoot || (poolPolicies && poolPolicies.canManage)) && (
                <div className="search-container">
                  <DropdownButton
                    items={subAccounts.map(sa => {
                      return {
                        label: `${sa.displayName}/${sa.username} ..... by ${currentAccount?.username}--${DateService.formatDate(sa.createdAt)}`,
                        onClick: () => {
                          setUsers([...users, sa]);
                          setSubAccounts(subAccounts.filter(sacc => sacc !== sa));
                        }
                      }
                    })}
                    align="start"
                    children={
                      <InputText
                        stretch={false}
                        Icon={MagnifyingGlass}
                        placeholder="Search by name or username"
                        value=""
                        onChange={() => {}}
                      />
                    }
                  />
                  <Button
                    label="Delete user"
                    borderRadius={3}
                    tyle="secondary"
                    onClick={() => {}}
                  />
                </div>
              )}

              <div className="user-table">
                <table
                  className="au-table"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: 40, textAlign: "center" }}>
                        <input
                          type="checkbox"
                          className="master-checkbox"
                          onChange={handleToggleAll}
                          aria-label="Select all users"
                        />
                      </th>
                      <th style={{ textAlign: "left" }}>Name/Displayname</th>
                      <th style={{ textAlign: "left" }}>Created by/Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        className="au-row"
                        onClick={() => setCurrentSelectedSubAcc(u)}
                        key={u.accountId}
                      >
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            className="user-row-checkbox"
                            data-userid={u.accountId}
                            onChange={handleRowToggle}
                            aria-label={`Select user ${u.username}`}
                          />
                        </td>
                        <td>
                          {u.displayName}/{u.username}
                        </td>
                        <td>
                          <i>by {currentAccount?.username}</i> --{" "}
                          {DateService.formatDate(u.createdAt ?? new Date())}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          }
        />
        <Card
          title="Pool policies"
          content={
            <div className="policy-content">
              {currentSelectedSubAcc && (
                <>
                  <div className="user-name">
                    <strong>
                      User name: {currentSelectedSubAcc.displayName}/
                      {currentSelectedSubAcc.username}
                    </strong>
                  </div>
                  <div className="search-container">
                    <InputText
                      stretch={false}
                      onChange={() => {}}
                      value=""
                      Icon={MagnifyingGlass}
                      placeholder="Search for pool policy"
                    />
                    <ConfirmPopup
                      onAccept={async () => {
                        // attatch policy
                        await poolPoliciesService.attachUserPool(
                          policyList,
                          currentSelectedSubAcc.accountId ?? "",
                          poolID ?? "",
                          subUserPoolPoolicies?.policyId
                        );
                      }}
                      children={
                        <Button
                          label="Save"
                          borderRadius={3}
                          tyle="primary"
                          onClick={() => {}}
                        />
                      }
                    />
                  </div>
                  <MiniPolicyTable
                    datas={policyList}
                    onSelected={(plcl) => setPolicyList(plcl)}
                  />
                </>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AccessableUsers;
