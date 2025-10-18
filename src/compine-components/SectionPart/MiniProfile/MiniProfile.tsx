import React from "react";
import "./MiniProfile.css";
import Account from "../../../entities/account";
import IconButton from "../../../components/IconButton/IconButton";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowSquareIn,
  Copy,
  MagnifyingGlass,
  Power,
  Trash,
} from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { UserPool } from "../../../entities/user-pool";

const MiniProfile: React.FC = () => {
  const account: Account = {
    accountId: "123",
    username: "johndoe",
    password: "password123",
    email: "mail@mail.com",
    displayName: "John Doe",
    avatar: "",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    delFlag: false,
    rootId: "12",
    parentId: "12",
  };

  const initialPools:UserPool[] = [
    { poolId: "p1", poolName: "Main Pool", account: {accountId:"leequan"}, createdAt: new Date()},
    { poolId: "p2", poolName: "Backup Pool", account: {accountId:"leequan"},createdAt: new Date() },
    { poolId: "p3", poolName: "Test Pool", account: {accountId:"leequan"}, createdAt: new Date() },
  ];

  const [pools] = React.useState(initialPools);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);

  const isAllSelected = pools.length > 0 && selected.size === pools.length;
  const isNoneSelected = selected.size === 0;

  React.useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate =
        !isAllSelected && !isNoneSelected;
    }
  }, [selected, pools, isAllSelected, isNoneSelected]);

  const toggleAll = () => {
    if (isAllSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pools.map((p) => p.poolId??"")));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mini-profile-container">
      <div className="mini-profile-header">
        <h2 className="mn-pf-header-name">User's profile</h2>
        <IconButton Icon={ArrowSquareIn} IconSize={20} onClick={() => {}} />
      </div>
      <div className="mini-profile-body">
        <h3>Account information</h3>

        <div className="acc-card">
          <div className="acc-card-left">
            <div className="acc-id-copy">
              <span>
                <strong>Account ID: </strong>
                {account.accountId}
              </span>
              <IconButton Icon={Copy} IconWeight="regular" onClick={() => {}} />
            </div>
            <span>
              <strong>Username: </strong>
              {account.username}
            </span>
            <span>
              <strong>Display name: </strong>
              {account.displayName}
            </span>
            <span>
              <strong>Email: </strong>
              {account.email}
            </span>
            <span>
              <strong>Created at: </strong>
              {account.createdAt?.toDateString()}
            </span>
            <span>
              <strong>Status: </strong>
              {account.active ? "Active" : "Disable"}
            </span>
            <span>
              <strong>Is Deleted: </strong>
              {account.delFlag ? "True" : "False"}
            </span>
          </div>
          <div className="acc-card-right">
            <IconButton Icon={Copy} IconWeight="regular" onClick={() => {}} />
            <IconButton
              Icon={ArrowCounterClockwise}
              IconWeight="regular"
              onClick={() => {}}
            />
            <IconButton Icon={Power} IconWeight="regular" onClick={() => {}} />
            <IconButton Icon={Trash} IconWeight="regular" onClick={() => {}} />
          </div>
        </div>

        <div className="horizontal-line"></div>

        <div className="mn-pool-info-header">
          <h3>User pool information</h3>
          <IconButton Icon={ArrowClockwise} IconSize={20} onClick={() => {}} />
        </div>

        <div className="mn-search-box">
          <InputText
            value=""
            stretch={false}
            width={180}
            onChange={() => {}}
            placeholder="Search for pool information"
            Icon={MagnifyingGlass}
          />
          <Button
            label="+ Add pool"
            borderRadius={3}
            tyle="tertiary"
            onClick={() => {}}
          />
          <Button
            label="Delete pool"
            borderRadius={3}
            tyle="secondary"
            onClick={() => {}}
          />
        </div>
        <div className="mn-pool-table-wrapper">
          <table className="mn-pool-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={isAllSelected}
                    onChange={toggleAll}
                    aria-label="Select all pools"
                  />
                </th>
                <th>Pool name</th>
                <th>Created by/Date</th>
              </tr>
            </thead>
            <tbody>
              {pools.map((pool) => (
                <tr
                  key={pool.poolId}
                  className={selected.has(pool.poolId??"") ? "selected" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.has(pool.poolId??"")}
                      onChange={() => toggleOne(pool.poolId??"")}
                      aria-label={`Select pool ${pool.poolName}`}
                    />
                  </td>
                  <td>{pool.poolName}</td>
                  <td><i>by {pool.account?.accountId}</i>-{pool.createdAt?.toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
