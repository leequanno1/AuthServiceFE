import React from "react";
import "./MiniPolicyInfo.css";
import Button from "../../../components/Button/Button";
import MiniPolicyTable from "../../Table/MiniPolicyTable/MiniPolicyTable";
import { Policy } from "../../../entities/policies";
import Account from "../../../entities/account";
import { UserPool } from "../../../entities/user-pool";
import { accountPoliciesService } from "../../../services/account-policies-service";
import poolPoliciesService from "../../../services/pool-policies-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";
import { AccountPolicies } from "../../../entities/account-policies";
import { UserPoolPolicies } from "../../../entities/user-pool-policies";
import accountStore from "../../../store/account.store";
import { toastService } from "../../../services/toast-service";

interface MiniPolicyInfoProps {
  account: Account | null;
  pool: UserPool | null;
}

const MiniPolicyInfo: React.FC<MiniPolicyInfoProps> = ({ account, pool }) => {
  const [accountPolicies, setAccountPolicies] = React.useState<Policy[]>([]);
  const [userPoolPolicies, setUserPoolPolicies] = React.useState<Policy[]>([]);
  const [accountPolicy, setAccountPolicy] =
    React.useState<AccountPolicies | null>(null);
  const [poolPolicy, setPoolPolicy] = React.useState<UserPoolPolicies | null>(
    null
  );
  const [selectedAccPlc, setSelectedAccPlc] = React.useState<Policy[]>([]);
  const [selectedPoolPlc, setSelectedPoolPlc] = React.useState<Policy[]>([]);

  const isAccountPlcDisable =
    !!accountPolicy?.creatorId &&
    accountPolicy?.creatorId !== accountStore.getState().account?.accountId;
  const isPoolPlcDisable =
    !!poolPolicy?.creatorId &&
    poolPolicy?.creatorId !== accountStore.getState().account?.accountId;

  React.useEffect(() => {
    const initAccPolicies = async () => {
      try {
        if (!account) {
          setAccountPolicies([]);
        } else {
          // call api
          console.log(account.username);
          const policies = await accountPoliciesService.getAccountPolicies(
            account.accountId ?? ""
          );
          const plcList = await accountPoliciesService.initAccountPoliciesList(
            policies
          );
          setAccountPolicy(policies);
          setAccountPolicies(plcList);
        }

        setUserPoolPolicies([]);
      } catch (error) {
        toastService.error("An error occurred while loading policies.");
      }
    };

    initAccPolicies();
  }, [account]);

  React.useEffect(() => {
    const initPoolPlicies = async () => {
      try {
        if (!pool) {
          setUserPoolPolicies([]);
        } else {
          const policies = await poolPoliciesService.getPolicyBySubAccountId(
            account?.accountId ?? "",
            pool.poolId ?? ""
          );
          const plcList = poolPoliciesService.initPoolPolicyList(policies);
          setPoolPolicy(policies);
          setUserPoolPolicies(plcList);
        }
      } catch (error) {
        toastService.error("An error occurred while loading policies.");
      }
    };

    initPoolPlicies();
  }, [account?.accountId, pool]);

  return (
    <div className="mn-policy-info-container">
      <div className="mini-pool-policy-header">
        <h2 className="mn-pp-header-name">User's policies</h2>
        {/* <IconButton Icon={ArrowSquareIn} IconSize={20} onClick={() => {}} /> */}
      </div>

      <div className="mini-pool-policy-body">
        {!!account && (
          <>
            <div className="session-sub-info">
              <div>
                <strong>Username:</strong>{" "}
                <span>
                  <span title={account.username}>{account.username}</span> -{" "}
                  <span title={account.displayName}>{account.displayName}</span>
                </span>
              </div>
              <ConfirmPopup
                disabled={isAccountPlcDisable}
                onAccept={async () => {
                  await accountPoliciesService.attachAccountPolices(
                    account.accountId ?? "",
                    selectedAccPlc,
                    accountPolicy?.policyId
                  );
                }}
                children={
                  <Button
                    disabled={isAccountPlcDisable}
                    label="Save"
                    onClick={() => {}}
                    borderRadius={3}
                    tyle="primary"
                  />
                }
              />
            </div>

            <MiniPolicyTable
              datas={accountPolicies}
              onSelected={(plcs) => setSelectedAccPlc(plcs)}
            />

            <div className="nmpc-horizontal-line"></div>
          </>
        )}

        {!!pool && (
          <>
            <div className="session-sub-info">
              <div>
                <strong>Pool name:</strong>{" "}
                <span>
                  <span title={pool.poolName}>{pool.poolName}</span>
                </span>
              </div>
              <ConfirmPopup
                disabled={isPoolPlcDisable}
                onAccept={async () => {
                  await poolPoliciesService.attachUserPool(
                    selectedPoolPlc,
                    account?.accountId ?? "",
                    pool.poolId ?? "",
                    poolPolicy?.policyId
                  );
                }}
                children={
                  <Button
                    disabled={isPoolPlcDisable}
                    label="Save"
                    onClick={() => {}}
                    borderRadius={3}
                    tyle="primary"
                  />
                }
              />
            </div>

            <MiniPolicyTable
              datas={userPoolPolicies}
              onSelected={(plcs) => setSelectedPoolPlc(plcs)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MiniPolicyInfo;
