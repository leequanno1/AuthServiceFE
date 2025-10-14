import React from "react";
import "./SubUserAndPoliciesInfo.css"
import { useParams } from "react-router-dom";
import UserTable from "../../Table/UserTable/UserTable";
import Card from "../../../components/Card/Card";
import MiniPolicyTable from "../../Table/MiniPolicyTable/MiniPolicyTable";
import LinkIconButton from "../../../components/LinkIconButton/LinkIconButton";
import { ArrowSquareIn, MagnifyingGlass } from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";

const SubUserAndPoliciesInfo: React.FC = () => {
    
    const {accountId} = useParams();
    
    return (
        <div className="outlet-content">
            <UserTable/>
            <Card
        title="User policies"
        optionButtons={
          <LinkIconButton to="" Icon={ArrowSquareIn} IconSize={24} />
        }
        content={
          <div className="policy-card-content">
            <span className="name">
              <strong>Username:</strong>username_1 - random-user-id
            </span>
            <div className="search-box">
              <InputText
                stretch={false}
                onChange={() => {}}
                value=""
                Icon={MagnifyingGlass}
                placeholder="Search for user policy"
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
    )
}

export default SubUserAndPoliciesInfo;