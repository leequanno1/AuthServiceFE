import React from "react";
import "./CreateSubUser.css";
import Card from "../../components/Card/Card";
import MiniPolicyTable from "../../compine-components/Table/MiniPolicyTable/MiniPolicyTable";
import { MagnifyingGlass, X } from "phosphor-react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import { CSA_ERROR_MESSAGE } from "../../constants/error-message/create-sub-account";
import { createPassword } from "../../services/password-service";
import { isEmailFormat } from "../../services/email-service";
import { Policy } from "../../entities/policies";
import policyService from "../../services/policy-service"
import { api } from "../../services/api-service";
import { getServerErrorCode } from "../../services/error-code-service";
import { useNavigate } from "react-router-dom";
import { accountInfoContent, exportTextFile } from "../../services/file-export-service";

const CreateSubUser: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [errorCode, setErrorCode] = React.useState<string>("");
  const [autoGenPassword, setAutoGenPassword] = React.useState<boolean>(false);
  const [saveInfoAsText, setSaveInfoAsText] = React.useState<boolean>(false);
  const [policies, setPolicies] = React.useState<Policy[]>([]);
  const [selectedPolicies, setSelectedPolicies] = React.useState<Policy[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const setStaterPolicies = async () => {
      setPolicies(await policyService.getStaterAccountPolicies())
    }
    setStaterPolicies();
  }, []);

  return (
    <div className="create-sub-account-container">
      <h1>Create New Sub-Account</h1>
      <div className="content-scrollable">
        <Card title="Authentication information">
          <div className="auth-info-content">
            <div className="input-pare">
              <InputText
                lable="Username"
                value={username}
                placeholder="example_username"
                stretch={false}
                onChange={(value) => setUsername(value)}
              />
              {errorCode === "CC1000" && (
                <small>
                  <X fontSize={16} color="var(--danger-color)" />
                  <i>{CSA_ERROR_MESSAGE.CC1000}</i>
                </small>
              )}
              {errorCode === "1003" && (
                <small>
                  <X fontSize={16} color="var(--danger-color)" />
                  <i>{CSA_ERROR_MESSAGE.SC1003}</i>
                </small>
              )}
            </div>

            <div className="input-pare">
              <InputText
                lable="Password"
                value={password}
                stretch={false}
                type="password"
                placeholder="••••••••"
                disabled={autoGenPassword}
                onChange={(value) => setPassword(value)}
              />
              {errorCode === "CC1001" && (
                <small>
                  <X fontSize={16} color="var(--danger-color)" />
                  <i>{CSA_ERROR_MESSAGE.CC1001}</i>
                </small>
              )}
            </div>
            <div>
              <div className="auto-generate-pass-container">
                <input
                  id="autoGeneratePass"
                  checked={autoGenPassword}
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      // generate new pass
                      setPassword(createPassword())
                      setSaveInfoAsText(true);
                    } else {
                      // clear password
                      setPassword("")
                    }
                    setAutoGenPassword(isChecked)
                  }}
                />{" "}
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
                value={email}
                stretch={false}
                type="email"
                placeholder="example@email.com"
                onChange={(value) => setEmail(value)}
              />
              {errorCode === "CC1002" && (
                <small>
                  <X fontSize={16} color="var(--danger-color)" />
                  <i>{CSA_ERROR_MESSAGE.CC1002}</i>
                </small>
              )}
              {errorCode === "1004" && (
                <small>
                  <X fontSize={16} color="var(--danger-color)" />
                  <i>{CSA_ERROR_MESSAGE.SC1004}</i>
                </small>
              )}
              {errorCode === "CC1003" && (
                <small>
                  <X fontSize={16} color="var(--danger-color)" />
                  <i>{CSA_ERROR_MESSAGE.CC1003}</i>
                </small>
              )}
            </div>
            <div className="save-as-text-file">
              <input
                disabled={autoGenPassword}
                id="saveAsTextFile"
                type="checkbox"
                checked={saveInfoAsText}
                onChange={(e) => setSaveInfoAsText(e.target.checked)}
              />{" "}
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
            </div>
            <MiniPolicyTable datas={policies} onSelected={(plcs) => setSelectedPolicies(plcs)}/>
          </div>
        </Card>

        <div style={{ width: "220px", textAlign: "start" }}>
          <Button
            tyle="tertiary"
            borderRadius={3}
            onClick={async () => {
              if (!username) {
                setErrorCode("CC1000");
                return;
              }
              if (!password) {
                setErrorCode("CC1001");
                return;
              }
              if (!email) {
                setErrorCode("CC1002");
                return;
              }
              if (!isEmailFormat(email)) {
                setErrorCode("CC1003");
                return;
              }
              setErrorCode("");
              // add user
              let accountId = "";
              try {
                const body = {
                  username,
                  password,
                  email,
                }
                const response = await api.post("/account/create-subuser", body);
                accountId = response.data.message;
                // export data to text file
                if (saveInfoAsText) {
                  exportTextFile(`Account_info_${accountId}.txt`, accountInfoContent(username, password, email));
                }
              } catch (error) {
                setErrorCode(getServerErrorCode(error).toString());
                return;
              }
              // add policies
              if (selectedPolicies) {
                try {
                  const body = policyService.toAccountPoliciesRqBody(selectedPolicies, accountId);
                  await api.post("/account-policy/attach", body);
                } catch (error) {
                  console.error(error);
                }
              }

              navigate(`/account-control/user/${accountId}`, {replace:true});
            }}
            label="Confirm created"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSubUser;
