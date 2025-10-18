import React from "react";
import "./CreateEmptyPool.css";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";

const CreateEmptyPool: React.FC = () => {
  return (
    <div className="input-form">
      <div className="validationable">
        <InputText
          stretch={false}
          onChange={() => {}}
          value=""
          lable="User pool name"
          placeholder="example_user_pool_name"
        />
        <small>Name already existed</small>
      </div>
      <Button
        tyle="tertiary"
        onClick={() => {}}
        label="Confirm created"
        borderRadius={3}
      />
    </div>
  );
};

export default CreateEmptyPool;
