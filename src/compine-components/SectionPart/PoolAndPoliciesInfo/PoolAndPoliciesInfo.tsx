import React from "react";
import "./PoolAndPoliciesInfo.css";
import { useParams } from "react-router-dom";
import Card from "../../../components/Card/Card";
import { MagnifyingGlass } from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import MiniPolicyTable from "../../Table/MiniPolicyTable/MiniPolicyTable";
import { DateService } from "../../../services/date-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";
import { UserPool } from "../../../entities/user-pool";
import poolPoliciesService from "../../../services/pool-policies-service";
import userPoolService from "../../../services/user-pool-service";
import accountStore from "../../../store/account.store";
import accountService from "../../../services/account-service";
import userPoolStore from "../../../store/user-pool.store";
import { Policy } from "../../../entities/policies";
import { UserPoolPolicies } from "../../../entities/user-pool-policies";
import { toastService } from "../../../services/toast-service";

const PoolAndPoliciesInfo: React.FC = () => {
  const { accountId } = useParams();
  const [search, setSearch] = React.useState<string>("");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [pools, setPools] = React.useState<UserPool[]>([]);
  const [lastSelectedPool, setLastSelectedPool] =
    React.useState<UserPool | null>(null);
  const [selectedPlcs, setSelectedPlcs] = React.useState<Policy[]>([]);
  const [plcs, setPlcs] = React.useState<Policy[]>([]);
  const [poolPolicy, setPoolPolicy] = React.useState<UserPoolPolicies | null>(
    null
  );

  const totalPools = userPoolStore.getState().userPools;
  const accountRoot = accountStore.getState().rootAccount;
  const headerCheckboxRef = React.useRef<HTMLInputElement | null>(null);
  const isAllSelected = pools.length > 0 && selected.size === pools.length;
  const isNoneSelected = selected.size === 0;

  React.useEffect(() => {
    // init pools data
    const initPoolsData = async () => {
      try {
        if (accountId) {
          const tempPools = await userPoolService.getAllPoolByAccountID(
            accountId ?? ""
          );
          setPools(tempPools ?? []);
          await accountService.getRootDetails();
          await userPoolService.refreshUserPool();
        }
      } catch (error) {
        toastService.error(
          "An error occurred while loading pool and policies's data."
        );
      }
    };

    initPoolsData();
  }, [accountId]);

  React.useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate =
        !isAllSelected && !isNoneSelected;
    }
  }, [selected, pools, isAllSelected, isNoneSelected]);

  React.useEffect(() => {
    const initPoolPlcs = async () => {
      try {
        if (!!lastSelectedPool) {
          const poolPlc = await poolPoliciesService.getPolicyBySubAccountId(
            accountId ?? "",
            lastSelectedPool?.poolId ?? ""
          );
          setPoolPolicy(poolPlc);
          setPlcs(poolPoliciesService.initPoolPolicyList(poolPlc));
        }
      } catch (error) {
        toastService.error("An error occurred while loading policies.");
      }
    };

    initPoolPlcs();
  }, [accountId, lastSelectedPool]);

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
    <div className="outlet-content">
      <Card
        title="User Pool Table"
        children={
          <div className="pool-table-wrapper">
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
                onAccept={async () => {
                  let plcIds: string[] = [];
                  const selectedArr = Array.from(selected);
                  // first get pool policy, if policy exist then delete policy
                  for (const sl of selectedArr) {
                    const plc =
                      await poolPoliciesService.getPolicyBySubAccountId(
                        accountId ?? "",
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
                  setLastSelectedPool(null);
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
                        setLastSelectedPool(pool);
                      }}
                    >
                      <td style={{textAlign: "center"}}>
                        <input
                          type="checkbox"
                          checked={selected.has(pool.poolId ?? "")}
                          onChange={() => toggleOne(pool.poolId ?? "")}
                          aria-label={`Select pool ${pool.poolName}`}
                        />
                      </td>
                      <td>{pool.poolName}</td>
                      <td>
                        <i>by {accountRoot?.username}</i>-
                        {DateService.formatDate(pool.createdAt)}
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
          <div className="policy-card-content">
            {!!lastSelectedPool && (
              <>
                <div className="session-sub-info">
                  <div>
                    <strong>Pool name:</strong>{" "}
                    <span>
                      <span title={lastSelectedPool?.poolName}>
                        {lastSelectedPool?.poolName}
                      </span>{" "}
                      -{" "}
                      <span title={lastSelectedPool?.poolId}>
                        {lastSelectedPool?.poolId}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mnpc-search-box">
                  <InputText
                    stretch={false}
                    value=""
                    Icon={MagnifyingGlass}
                    IconSize={20}
                    width={180}
                    placeholder="Search for pool policy"
                    onChange={() => {}}
                  />
                  <ConfirmPopup
                    onAccept={async () => {
                      await poolPoliciesService.attachUserPool(
                        selectedPlcs,
                        accountId ?? "",
                        lastSelectedPool?.poolId ?? "",
                        poolPolicy?.policyId
                      );
                    }}
                    children={
                      <Button
                        label="Save"
                        onClick={() => {}}
                        borderRadius={3}
                        tyle="primary"
                      />
                    }
                  />
                </div>
                <MiniPolicyTable
                  datas={plcs}
                  onSelected={(plcs) => setSelectedPlcs(plcs)}
                />
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default PoolAndPoliciesInfo;
