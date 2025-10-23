import React from "react";
import "./CreateFullFunctionPool.css";
import InputText from "../../../components/InputText/InputText";
import NameTag from "../../../components/NameTag/NameTag";
import Button from "../../../components/Button/Button";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";
import { CFFP_ERROR_MESSAGE } from "../../../constants/error-message/create-full-functional-pool";
import { api } from "../../../services/api-service";
import { UserPool } from "../../../entities/user-pool";
import { getServerErrorCode } from "../../../services/error-code-service";
import { useNavigate } from "react-router-dom";

const CreateFullFunctionPool: React.FC = () => {
  const navigate = useNavigate();
  const [poolName, setPoolName] = React.useState<string>("");
  const [userField, setUserField] = React.useState<string>("");
  const [authField, setAuthField] = React.useState<string>("");
  const [needEmailValidation, setNeedEmailValidation] =
    React.useState<boolean>(false);
  const [accessTokenExpiry, setAccessTokenExpiry] = React.useState<number>(2);
  const [refreshTokenExpiry, setRefreshTokenExpiry] = React.useState<number>(7);
  const [selectedUserFields, setSelectedUserFields] = React.useState<string[]>([
    "username",
    "password",
    "email",
  ]);
  const [errorCode, setErrorCode] = React.useState<string>("");
  const [selectedAuthFields, setSelectedAuthFields] = React.useState<string[]>([
    "username",
    "password",
  ]);
  const [fieldOptions, setFieldOptions] = React.useState<string[]>([
    "phoneNumber",
    "telCountryCode",
    "lastName",
    "firstName",
    "avatarImg",
    "backgroundImg",
    "displayName",
    "gender",
    "createdAt",
    "updatedAt",
  ]);

  return (
    <div className="input-form">
      <div className="validationable">
        <InputText
          stretch={false}
          onChange={(value) => setPoolName(value)}
          value={poolName}
          lable="User pool name"
          placeholder="example_user_pool_name"
        />
        {errorCode === "2002" && <small>{CFFP_ERROR_MESSAGE.SC2002}</small>}
        {errorCode === "CC1002" && <small>{CFFP_ERROR_MESSAGE.CC1002}</small>}
      </div>
      <div className="field-container">
        <div className="validationable">
          <DropdownButton
            align="center"
            keepOpenOnFocus={true}
            items={[
              ...fieldOptions
                .filter((field) => field.includes(userField))
                .map((field) => {
                  return {
                    label: field,
                    onClick: () => {
                      setSelectedUserFields([...selectedUserFields, field]);
                      setFieldOptions(fieldOptions.filter((f) => f !== field));
                    },
                  };
                }),
            ]}
            children={
              <InputText
                width={300}
                stretch={false}
                onChange={(value) => {
                  setUserField(value);
                }}
                value={userField}
                lable="User fields"
                placeholder="Find your fields"
              />
            }
          />
          {errorCode === "CC1000" && <small>{CFFP_ERROR_MESSAGE.CC1000}</small>}
        </div>
        <div className="name-tags-container">
          {selectedUserFields.map((field) => (
            <NameTag
              key={field}
              name={field}
              onClick={() => {
                setSelectedUserFields(
                  selectedUserFields.filter((item) => item !== field)
                );
                setSelectedAuthFields(
                  selectedAuthFields.filter((item) => item !== field)
                );
                setFieldOptions([...fieldOptions, field]);
                if (field === "email") {
                  setNeedEmailValidation(false);
                }
              }}
            />
          ))}
        </div>
        <span className="sub-scription">
          This is where you declare the fields you want to store in your user
          pool.
        </span>
      </div>
      <div className="field-container">
        <div className="validationable">
          <DropdownButton
            align="center"
            items={[
              ...selectedUserFields
                .filter(
                  (field) =>
                    field.includes(authField) &&
                    !selectedAuthFields.includes(field)
                )
                .map((field) => {
                  return {
                    label: field,
                    onClick: () => {
                      setSelectedAuthFields([...selectedAuthFields, field]);
                    },
                  };
                }),
            ]}
            children={
              <InputText
                width={300}
                stretch={false}
                onChange={(value) => setAuthField(value)}
                value={authField}
                lable="Authentication fields"
                placeholder="Find your fields"
              />
            }
          />
          {errorCode === "CC1001" && <small>{CFFP_ERROR_MESSAGE.CC1001}</small>}
        </div>
        <div className="name-tags-container">
          {selectedAuthFields.map((field) => (
            <NameTag
              key={field}
              name={field}
              onClick={() =>
                setSelectedAuthFields(
                  selectedAuthFields.filter((item) => item !== field)
                )
              }
            />
          ))}
        </div>
        <span className="sub-scription">
          This is where you declare which fields need to be filled in when the
          user performs authentication.
        </span>
      </div>

      <div className="check-box-container">
        <input
          type="checkbox"
          checked={needEmailValidation}
          id="needEmailValidation"
          onChange={(e) => {
            setNeedEmailValidation(e.target.checked);
            if (e.target.checked && !selectedUserFields.includes("email")) {
              setSelectedUserFields([...selectedUserFields, "email"]);
              setFieldOptions(fieldOptions.filter((f) => f !== "email"));
            }
          }}
        />
        <label htmlFor="needEmailValidation">
          Need email validation when sign up.
        </label>
      </div>

      <InputText
        stretch={false}
        type="number"
        onChange={(value) => {
          if (Number(value) < 1) {
            value = "1";
          }
          if (Number(value) > 60) {
            value = "60";
          }
          setAccessTokenExpiry(Number(value));
        }}
        value={accessTokenExpiry.toString()}
        lable="Access token expired minute"
        placeholder="..."
      />
      <InputText
        stretch={false}
        type="number"
        onChange={(value) => {
          if (Number(value) < 1) {
            value = "1";
          }
          if (Number(value) > 15) {
            value = "15";
          }
          setRefreshTokenExpiry(Number(value));
        }}
        value={refreshTokenExpiry.toString()}
        lable="Refresh token expired day"
        placeholder="..."
      />

      <Button
        tyle="tertiary"
        onClick={async () => {
          if (!poolName) {
            setErrorCode("CC1002");
            return;
          }
          if (
            !selectedUserFields.includes("username") ||
            !selectedUserFields.includes("password")
          ) {
            setErrorCode("CC1000");
            return;
          }
          if (
            !selectedAuthFields.includes("username") ||
            !selectedAuthFields.includes("password")
          ) {
            setErrorCode("CC1001");
            return;
          }
          setErrorCode("");
          try {
            const body: UserPool = {
              poolName: poolName,
              userFields: selectedUserFields,
              authorizeFields: selectedAuthFields,
              emailVerify: needEmailValidation,
              accessExpiredMinutes: accessTokenExpiry,
              refreshExpiredDays: refreshTokenExpiry,
            };
            const response = await api.post("/user-pool/create", body);
            const poolID = response.data.message;
            navigate(`/pool-control/pool/${poolID}`, { replace: true });
          } catch (error) {
            setErrorCode(getServerErrorCode(error).toString());
          }
        }}
        label="Confirm created"
        borderRadius={3}
      />
    </div>
  );
};

export default CreateFullFunctionPool;
