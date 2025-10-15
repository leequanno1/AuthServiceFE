import React, { useState } from "react";
import "./UserPoolControl.css";
import Button from "../../components/Button/Button";
import UserPoolTable from "../../compine-components/Table/UserPoolTable/UserPoolTable";
import Card from "../../components/Card/Card";
import { ArrowSquareIn, Copy, Eye, Pen, Check } from "phosphor-react";
import LinkIconButton from "../../components/LinkIconButton/LinkIconButton";
import IconButton from "../../components/IconButton/IconButton";
import NameTag from "../../components/NameTag/NameTag";
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";

const UserPoolControl: React.FC = () => {

  const [isShowKey, setIsShowKey] = useState(false);
  const poolKey: string = "nigga-for-sale-1-dolar"; 

  return (
    <div className="user-pool-control-container">
      <div className="upc-header">
        <h1>User Pools Control</h1>
        <Button
          label="+ Add new pool"
          onClick={() => {}}
          tyle="tertiary"
          borderRadius={3}
        />
      </div>

      <div className="scrollable-content">
        <UserPoolTable tableName="User Pools Control" />

        <MiniPoolInfo/>
      </div>
    </div>
  );
};

export default UserPoolControl;
