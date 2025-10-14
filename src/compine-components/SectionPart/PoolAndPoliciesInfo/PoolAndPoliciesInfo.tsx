import React from "react";
import "./PoolAndPoliciesInfo.css";
import { useParams } from "react-router-dom";
import UserPoolTable from "../../Table/UserPoolTable/UserPoolTable";
import Card from "../../../components/Card/Card";
import IconButton from "../../../components/IconButton/IconButton";
import { ArrowSquareIn, MagnifyingGlass } from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import MiniPolicyTable from "../../Table/MiniPolicyTable/MiniPolicyTable";
import LinkIconButton from "../../../components/LinkIconButton/LinkIconButton";

const PoolAndPoliciesInfo: React.FC = () => {
  const { accountId } = useParams();

  return (
    <div className="outlet-content">
      <UserPoolTable />
      <Card
        title="Pool policies"
        optionButtons={
          <LinkIconButton to="" Icon={ArrowSquareIn} IconSize={24} />
        }
        content={
          <div className="policy-card-content">
            <span className="name">
              <strong>Pool name:</strong>User pool 1 - random_pool_id
            </span>
            <div className="search-box">
              <InputText
                stretch={false}
                onChange={() => {}}
                value=""
                Icon={MagnifyingGlass}
                placeholder="Search for pool policy"
              />
              <Button
                label="Save"
                onClick={() => {}}
                borderRadius={3}
                tyle="primary"
              />
            </div>
            <MiniPolicyTable datas={[]} />
          </div>
        }
      />
    </div>
  );
};

export default PoolAndPoliciesInfo;
