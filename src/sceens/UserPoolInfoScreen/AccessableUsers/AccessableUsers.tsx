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

const AccessableUsers: React.FC = () => {
  const users:Account[] = [
    { accountId: "u1",username:"niga1", displayName: "Alice Nguyen", createdAt: new Date(), parentId:"niga-69" },
    { accountId: "u2",username:"niga2", displayName: "Alice Tran", createdAt: new Date(), parentId:"niga-69" },
    { accountId: "u3",username:"niga3", displayName: "Alice Lee", createdAt: new Date(), parentId:"niga-69" },
  ];

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
    const container = document.querySelector(".user-table") as HTMLElement | null;
    if (!container) return [];
    const checkedInputs = container.querySelectorAll<HTMLInputElement>(
        "input.user-row-checkbox:checked"
    );
    const ids = Array.from(checkedInputs)
        .map((i) => i.dataset.userid)
        .filter(Boolean) as string[];
    return users.filter((u) => ids.includes(u.accountId??""));
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
            <div className="search-container">
              <InputText
                stretch={false}
                Icon={MagnifyingGlass}
                placeholder="Search by name or username"
                value=""
                onChange={() => {}}
              />
              <Button
                label="+ Add user"
                borderRadius={3}
                tyle="tertiary"
                onClick={() => {}}
              />
              <Button
                label="Delete user"
                borderRadius={3}
                tyle="secondary"
                onClick={() => {}}
              />
            </div>

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
                    <tr key={u.accountId}>
                      <td style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          className="user-row-checkbox"
                          data-userid={u.accountId}
                          onChange={handleRowToggle}
                          aria-label={`Select user ${u.username}`}
                        />
                      </td>
                      <td>{u.displayName}/{u.username}</td>
                      <td><i>by {u.parentId}</i> -- {DateService.formatDate(u.createdAt??new Date())}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      />
      <Card title="Pool policies" 
        content={
          <div className="policy-content">
            <div className="user-name"><strong>User name: </strong>User name - username</div>
            <div className="search-container">
              <InputText stretch={false} onChange={() => {}} value="" Icon={MagnifyingGlass} placeholder="Search for pool policy"/>
              <Button label="Save" borderRadius={3} tyle="primary" onClick={() => {}}/>
            </div>
            <MiniPolicyTable datas={[]}/>
          </div>
        } />
      </div>
    </div>
  );
};

export default AccessableUsers;
