import React from "react";
import "./MiniProfile.css";
import Account from "../../../entities/account";
import IconButton from "../../../components/IconButton/IconButton";
import {
  ArrowCounterClockwise,
  ArrowSquareIn,
  Copy,
  MagnifyingGlass,
  Power,
} from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { UserPool } from "../../../entities/user-pool";
import { DateService } from "../../../services/date-service";
import userPoolService from "../../../services/user-pool-service";
import LinkIconButton from "../../../components/LinkIconButton/LinkIconButton";
import { createPassword, handleCopy } from "../../../services/password-service";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import poolPoliciesService from "../../../services/pool-policies-service";
import accountService from "../../../services/account-service";
import accountStore from "../../../store/account.store";
import { exportAccountInfo } from "../../../services/file-export-service";
import { toastService } from "../../../services/toast-service";

interface MiniProfileProps {
  account: Account | null;
  totalPools?: UserPool[];
  onPoolSelect?: (pool: UserPool) => void;
}

const MiniProfile: React.FC<MiniProfileProps> = ({
  account,
  totalPools = [],
  onPoolSelect = () => {},
}) => {
  const [nAccount, setAccount] = React.useState<Account | undefined | null>();
  const [pools, setPools] = React.useState<UserPool[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState<string>("");

  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);
  const isAllSelected = pools.length > 0 && selected.size === pools.length;
  const isNoneSelected = selected.size === 0;
  const rootAccount = accountStore.getState().rootAccount;

  React.useEffect(() => {
    // init pools data
    const initPoolsData = async () => {
      // handle get new account data
      try {
        if (account?.accountId) {
          let tmpAcc: Account | null | undefined = accountStore
            .getState()
            .subAccountMap?.get(account?.accountId ?? "");
          if (!tmpAcc) {
            await accountService.refreshSubAccount();
            tmpAcc = accountStore
              .getState()
              .subAccountMap?.get(account?.accountId ?? "");
            if (!tmpAcc) {
              tmpAcc = await accountService.getAccountByAccountId(
                account?.accountId ?? ""
              );
            }
          }
          setAccount(tmpAcc);
          const tempPools = await userPoolService.getAllPoolByAccountID(
            tmpAcc?.accountId ?? ""
          );
          setPools(tempPools ?? []);
          await accountService.getRootDetails();
        }
      } catch (error) {
        toastService.error("An error occurred while loading profile.");
      }
    };

    initPoolsData();
  }, [account?.accountId]);

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
      setSelected(new Set(pools.map((p) => p.poolId ?? "")));
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
        <LinkIconButton
          title="Open profile in new tab"
          Icon={ArrowSquareIn}
          IconSize={20}
          target="_blank"
          to={
            !!account
              ? `/account-control/user/${account.accountId}`
              : "/account-control"
          }
        />
      </div>
      <div className="mini-profile-body">
        {!!nAccount && (
          <>
            <h3>Account information</h3>

            <div className="acc-card">
              <div className="acc-card-left">
                <div className="acc-id-copy">
                  <span>
                    <strong>Account ID: </strong>
                    {nAccount.accountId}
                  </span>
                  <IconButton
                    Icon={Copy}
                    IconWeight="regular"
                    onClick={async () => {
                      await handleCopy(nAccount.accountId ?? "");
                    }}
                  />
                </div>
                <span>
                  <strong>Username: </strong>
                  {nAccount.username}
                </span>
                <span>
                  <strong>Display name: </strong>
                  {nAccount.displayName}
                </span>
                <span>
                  <strong>Email: </strong>
                  {nAccount.email}
                </span>
                <span>
                  <strong>Created at: </strong>
                  {DateService.formatDate(nAccount.createdAt)}
                </span>
                <span>
                  <strong>Status: </strong>
                  {nAccount.active ? "Active" : "Disable"}
                </span>
                <span>
                  <strong>Is Deleted: </strong>
                  {nAccount.delFlag ? "True" : "False"}
                </span>
              </div>
              <div className="acc-card-right">
                <ConfirmPopup
                  title="Confirm reset password."
                  description="This account's password will be reseted and export imformation as text file. Do you want to confirm this action?"
                  onAccept={async () => {
                    const newPassword = createPassword();
                    await accountService.resetSubAccountPassword(
                      nAccount.accountId ?? "",
                      newPassword
                    );
                    // export account info
                    let temAcc: Account = {
                      ...nAccount,
                      password: newPassword,
                    };
                    exportAccountInfo(temAcc);
                  }}
                  children={
                    <div title="Reset password">
                      <IconButton
                        title="Reset password"
                        Icon={ArrowCounterClockwise}
                        IconWeight="regular"
                        onClick={() => {}}
                      />
                    </div>
                  }
                />
                <ConfirmPopup
                  title={`${
                    !!nAccount.active ? "Disable" : "Active"
                  } this account.`}
                  description={`User ${nAccount.username} will be ${
                    !!nAccount.active ? "disabled" : "actived"
                  }. Do you want to continues this action?`}
                  onAccept={async () => {
                    // toggle account status
                    await accountService.toggleAccountStatus(
                      nAccount?.accountId ?? "",
                      !nAccount?.active
                    );
                    // refesh sub-account list
                    await accountService.refreshSubAccount();
                    // if ok modify account status state
                    setAccount(
                      accountStore
                        .getState()
                        .subAccountMap?.get(nAccount?.accountId ?? "")
                    );
                  }}
                  children={
                    <IconButton
                      title={
                        !!nAccount.active ? "Disable Account" : "Active Account"
                      }
                      Icon={Power}
                      IconWeight="regular"
                      onClick={() => {}}
                      color={
                        !!nAccount.active
                          ? "var(--danger-color)"
                          : "var(--text-color)"
                      }
                    />
                  }
                />
              </div>
            </div>

            <div className="horizontal-line"></div>

            <div className="mn-pool-info-header">
              <h3>User pool information</h3>
            </div>

            <div className="mn-search-box">
              <DropdownButton
                align="start"
                items={totalPools
                  .filter((sp) => {
                    let res = !pools.some((p) => p.poolId === sp.poolId);
                    if (!!search) {
                      res = !!sp.poolName
                        ?.toLowerCase()
                        .includes(search.toLowerCase());
                    }
                    return res;
                  })
                  .map((sp) => {
                    return {
                      label: `${sp.poolName} - ${sp.poolId}`,
                      onClick: () => {
                        // add to pools
                        setPools([...pools, sp]);
                      },
                    };
                  })}
                children={
                  <InputText
                    value={search}
                    stretch={false}
                    width={180}
                    onChange={(text) => {
                      setSearch(text);
                    }}
                    placeholder="Search for pool information"
                    Icon={MagnifyingGlass}
                  />
                }
              />
              <ConfirmPopup
                title={"Remove pool policy from this user."}
                description={
                  "All selected pool's policies will be deleted. Are you want to continues this action?"
                }
                onAccept={async () => {
                  let plcIds: string[] = [];
                  const selectedArr = Array.from(selected);
                  // first get pool policy, if policy exist then delete policy
                  for (const sl of selectedArr) {
                    const plc =
                      await poolPoliciesService.getPolicyBySubAccountId(
                        nAccount?.accountId ?? "",
                        sl
                      );
                    if (!!plc) {
                      plcIds.push(plc.policyId ?? "");
                    }
                  }
                  // then remove policies
                  if (!!plcIds && plcIds.length > 0) {
                    await poolPoliciesService.deletePolicy(plcIds);
                  }
                  setPools(
                    pools.filter((p) => !selectedArr.includes(p.poolId ?? ""))
                  );
                  setSelected(new Set());
                }}
                children={
                  <Button
                    label="Delete pool"
                    borderRadius={3}
                    tyle="secondary"
                    onClick={() => {}}
                  />
                }
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
                  {(!pools || pools.length === 0) && (
                    <tr className="pool-row empty">
                      <td colSpan={3}>No policies</td>
                    </tr>
                  )}
                  {pools.map((pool) => (
                    <tr
                      // key={pool.poolId}
                      className={`pool-row ${
                        selected.has(pool.poolId ?? "") ? "selected" : ""
                      }`}
                      onClick={() => {
                        onPoolSelect(pool);
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.has(pool.poolId ?? "")}
                          onChange={() => toggleOne(pool.poolId ?? "")}
                          aria-label={`Select pool ${pool.poolName}`}
                        />
                      </td>
                      <td>{pool.poolName}</td>
                      <td>
                        <i>by {rootAccount?.username}</i>-
                        {DateService.formatDate(pool.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
