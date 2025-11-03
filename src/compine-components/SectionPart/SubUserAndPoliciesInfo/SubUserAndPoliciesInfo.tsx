import React from "react";
import "./SubUserAndPoliciesInfo.css";
import { useParams } from "react-router-dom";
import UserTable from "../../Table/UserTable/UserTable";
import Card from "../../../components/Card/Card";
import MiniPolicyTable from "../../Table/MiniPolicyTable/MiniPolicyTable";
import LinkIconButton from "../../../components/LinkIconButton/LinkIconButton";
import { ArrowSquareIn, MagnifyingGlass } from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { AccountPolicies } from "../../../entities/account-policies";
import { accountPoliciesService } from "../../../services/account-policies-service";
import { Policy } from "../../../entities/policies";
import Account from "../../../entities/account";
import accountService from "../../../services/account-service";
import ConfirmPopup from "../../../components/ConfirmPopup/ConfirmPopup";

const SubUserAndPoliciesInfo: React.FC = () => {
  const { accountId } = useParams();

  const [accountPolicy, setAccountPolicy] =
    React.useState<AccountPolicies | null>(null);
  const [policyList, setPolicList] = 
    React.useState<Policy[]>([]);
  const [selectedPolicyList, setSelectedPolicList] = 
    React.useState<Policy[]>([]);
  const [account, setAccount] = 
    React.useState<Account | null>(null);
  const [lowerSubAccs, setLowerSubAccs] = 
    React.useState<Account[]>([]);

  React.useEffect(() => {
    const initPoolPolicy = async () => {
      const tempAccPlc = await accountPoliciesService.getAccountPolicies(
        accountId ?? ""
      );
      setAccountPolicy(tempAccPlc);
      const tempList =
        accountPoliciesService.initAccountPoliciesList(tempAccPlc);
      setPolicList(tempList);
      // get account
      const temAcc = await accountService.getAccountByAccountId(
        accountId ?? ""
      );
      setAccount(temAcc);
      // get lower-sub account 
      const tempLowerAccs = await accountService.getSubAccountsByParentID(accountId??"");
      setLowerSubAccs(tempLowerAccs);
    };

    initPoolPolicy();
  }, [accountId]);

  return (
    <div className="outlet-content">
      <UserTable hideDelete hideRefresh hideOption customAccounts={lowerSubAccs}/>
      <Card
        title="User policies"
        optionButtons={
          <LinkIconButton to="" Icon={ArrowSquareIn} IconSize={24} />
        }
        content={
          <div className="policy-card-content">
            <span className="name">
              <strong>Username:</strong>
              {account?.username} - {account?.accountId}
            </span>
            <div className="search-box">
              <InputText
                stretch={false}
                onChange={() => {}}
                value=""
                Icon={MagnifyingGlass}
                placeholder="Search for user policy"
              />
              <ConfirmPopup
                onAccept={ async () => {
                  await accountPoliciesService.attachAccountPolices(account?.accountId??"", selectedPolicyList, accountPolicy?.policyId);
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
              datas={policyList}
              onSelected={(plcs) => setSelectedPolicList(plcs)}
            />
          </div>
        }
      />
    </div>
  );
};

export default SubUserAndPoliciesInfo;
