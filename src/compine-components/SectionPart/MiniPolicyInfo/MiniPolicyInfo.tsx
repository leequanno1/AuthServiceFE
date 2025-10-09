import React from "react";
import "./MiniPolicyInfo.css";
import IconButton from "../../../components/IconButton/IconButton";
import { ArrowSquareIn, MagnifyingGlass } from "phosphor-react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";

const MiniPolicyInfo: React.FC = () => {
  return (
    <div className="mn-policy-info-container">
      <div className="mini-pool-policy-header">
        <h2 className="mn-pp-header-name">User's policies</h2>
        <IconButton Icon={ArrowSquareIn} IconSize={20} onClick={() => {}} />
      </div>

      <div className="mnpc-search-box">
        <InputText
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
    </div>
  );
};

export default MiniPolicyInfo;
