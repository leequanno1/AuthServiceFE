import React from "react";
import "./CreateFullFunctionPool.css";
import InputText from "../../../components/InputText/InputText";
import NameTag from "../../../components/NameTag/NameTag";
import Button from "../../../components/Button/Button";

const CreateFullFunctionPool: React.FC = () => {
  return (
    <div className="input-form">
      <div className="validationable">
        <InputText stretch={false} onChange={() => {}} value="" lable="User pool name" placeholder="example_user_pool_name" />
        <small>Name already existed</small>
      </div>
      <div className="field-container">
        <InputText stretch={false} onChange={() => {}} value="" lable="User fields" placeholder="Find your fields" />
        <div className="name-tags-container">
            <NameTag name="username"/>
            <NameTag name="password"/>
            <NameTag name="email"/>
            <NameTag name="address"/>
        </div>
        <span className="sub-scription">This is where you declare the fields you want to store in your user pool.</span>
      </div>
      <div className="field-container">
        <InputText stretch={false} onChange={() => {}} value="" lable="Authentication fields" placeholder="Find your fields" />
        <div className="name-tags-container">
            <NameTag name="username"/>
            <NameTag name="password"/>
        </div>
        <span className="sub-scription">This is where you declare which fields need to be filled in when the user performs authentication.</span>
      </div>

      <div className="check-box-container">
        <input type="checkbox" id="needEmailValidation"/>
        <label htmlFor="needEmailValidation">Need email validation when sign up.</label>
      </div>

      <InputText stretch={false} type="number" onChange={() => {}} value="" lable="Access token expired minute" placeholder="..." />
      <InputText stretch={false} type="number" onChange={() => {}} value="" lable="Refresh token expired day" placeholder="..." />

      <Button tyle="tertiary" onClick={() => {}} label="Confirm created" borderRadius={3} />
    </div>
  );
};

export default CreateFullFunctionPool;
