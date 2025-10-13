import React from "react";
import "./CreateSubUser.css";
import Card from "../../components/Card/Card";
import MiniPolicyTable from "../../compine-components/Table/MiniPolicyTable/MiniPolicyTable";
import { MagnifyingGlass, X } from "phosphor-react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";

const CreateSubUser: React.FC = () => {
  return (
    <div className="create-sub-account-container">
      <h1>Create New Sub-Account</h1>
      <div className="content-scrollable">
        <Card title="Authentication information">
          <div className="auth-info-content">
            <div className="input-pare">
              <InputText
                lable="Username"
                value=""
                placeholder="example_username"
                stretch={false}
                onChange={() => {}}
              />
              <small>
                <X fontSize={16} color="var(--danger-color)" />
                <i>Username already existed</i>
              </small>
            </div>

            <div className="input-pare">
              <InputText
                lable="Password"
                value=""
                stretch={false}
                type="password"
                placeholder="••••••••"
                onChange={() => {}}
              />
            </div>
            <div>
              <div className="auto-generate-pass-container">
                <input id="autoGeneratePass" type="checkbox" />{" "}
                <label htmlFor="autoGeneratePass">Auto generate password</label>
              </div>
              <div className="sub-scription">
                <i>
                  We strongly recommend you using "Auto generate password"
                  feature for generate default password.
                </i>
              </div>
            </div>
            <div className="input-pare">
              <InputText
                lable="Email"
                value=""
                stretch={false}
                type="email"
                placeholder="example@email.com"
                onChange={() => {}}
              />
              <small>
                <X fontSize={16} color="var(--danger-color)" />
                <i>Email already existed</i>
              </small>
            </div>
            <div className="save-as-text-file">
              <input id="saveAsTextFile" type="checkbox" />{" "}
              <label htmlFor="saveAsTextFile">
                Also save account information text file.
              </label>
            </div>
          </div>
        </Card>

        <Card title="Optional User policies">
          <div className="user-policy-content">
            <div className="policy-search-container">
              <InputText
                value=""
                stretch={false}
                onChange={() => {}}
                Icon={MagnifyingGlass}
                placeholder="Search for account polocy"
              />
              <Button label="Save" onClick={() => {}} borderRadius={3} />
            </div>
            <MiniPolicyTable datas={[]} />
          </div>
        </Card>

        <div style={{ width: "220px", textAlign: "start" }}>
          <Button
            tyle="tertiary"
            borderRadius={3}
            onClick={() => {}}
            label="Confirm created"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSubUser;
