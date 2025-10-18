import React from "react";
import "./MiniPolicyInfo.css";
import IconButton from "../../../components/IconButton/IconButton";
import { ArrowSquareIn, MagnifyingGlass } from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import MiniPolicyTable from "../../Table/MiniPolicyTable/MiniPolicyTable";
import { Policy } from "../../../entities/policies";

const MiniPolicyInfo: React.FC = () => {
  const accPoli: Policy[] = [
    { policyId: 1, policyName:"niga", accessRange: 1, type: "accout_policy" },
    { policyId: 2, policyName:"niga", accessRange: 2, type: "accout_policy" },
    { policyId: 3, policyName:"niga", accessRange: 2, type: "accout_policy" },
    { policyId: 4, policyName:"niga", accessRange: 1, type: "accout_policy" },
  ];

  const userPoolPoli: Policy[] = [
    { policyId: 1, policyName:"whiga", accessRange: 2, type: "pool_policy" },
    { policyId: 2, policyName:"whiga", accessRange: 1, type: "pool_policy" },
    { policyId: 3, policyName:"whiga", accessRange: 1, type: "pool_policy" },
    { policyId: 4, policyName:"whiga", accessRange: 2, type: "pool_policy" },
  ];

  const [accountPolicies] = React.useState(accPoli);
  const [userPoolPolicies] = React.useState(userPoolPoli);

  return (
    <div className="mn-policy-info-container">
      <div className="mini-pool-policy-header">
        <h2 className="mn-pp-header-name">User's policies</h2>
        <IconButton Icon={ArrowSquareIn} IconSize={20} onClick={() => {}} />
      </div>

      <div className="mini-pool-policy-body">
        <div className="session-sub-info">
        <strong>Pool name:</strong> <span>User pool 1 - random_pool_id</span>
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
        <Button
          label="Save"
          onClick={() => {}}
          borderRadius={3}
          tyle="primary"
        />
      </div>
      <MiniPolicyTable datas={accountPolicies} />

      <div className="nmpc-horizontal-line"></div>

      <div className="session-sub-info">
        <strong>Username:</strong> <span>random_username</span>
      </div>

      <div className="mnpc-search-box">
        <InputText
          value=""
          stretch={false}
          Icon={MagnifyingGlass}
          IconSize={20}
          width={180}
          placeholder="Search for pool policy"
          onChange={() => {}}
        />
        <Button
          label="Save"
          onClick={() => {}}
          borderRadius={3}
          tyle="primary"
        />
      </div>
      <MiniPolicyTable datas={userPoolPolicies} />
      </div>
    </div>
  );
};

export default MiniPolicyInfo;
