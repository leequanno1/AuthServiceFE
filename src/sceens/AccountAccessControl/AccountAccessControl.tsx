import "./AccountAccessControl.css";
import UserTable from "../../compine-components/Table/UserTable/UserTable";
import MiniProfile from "../../compine-components/SectionPart/MiniProfile/MiniProfile";
import MiniPolicyInfo from "../../compine-components/SectionPart/MiniPolicyInfo/MiniPolicyInfo";
import LinkButton from "../../components/LinkButton/LinkButton";
import { useEffect, useState } from "react";
import Account from "../../entities/account";
import { UserPool } from "../../entities/user-pool";
import userPoolService from "../../services/user-pool-service";
import userPoolStore from "../../store/user-pool.store";

const AccountAccessControl = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedPool, setSelectedPool] = useState<UserPool | null>(null);
  const [totalPools, setTotalPools] = useState<UserPool[]>([])

  useEffect(() => {
    const initAllAttachedPoolsValue = async () => {
      await userPoolService.refreshUserPool();
      setTotalPools(userPoolStore.getState().userPools);
    }

    initAllAttachedPoolsValue();
  }, [])

  return (
    <div className="aac-container">
      <div className="acc-header">
        <h1>Account Access Control</h1>
        <LinkButton
          to={"/account-control/create"}
          label="+ Add new user"
          type="tertiary"
          borderRadius={3}
        />
      </div>
      <div className="acc-body">
        <UserTable
          onSelected={(acc) => {
            setSelectedAccount(acc);
            setSelectedPool(null);
          }}
        />
        <div className="aac-right-container">
          <MiniProfile
            account={selectedAccount}
            onPoolSelect={(pool) => {
              setSelectedPool(pool);
            }}
            totalPools={totalPools}
          />
          <MiniPolicyInfo 
            account={selectedAccount} 
            pool={selectedPool} 
          />
        </div>
      </div>
    </div>
  );
};

export default AccountAccessControl;
