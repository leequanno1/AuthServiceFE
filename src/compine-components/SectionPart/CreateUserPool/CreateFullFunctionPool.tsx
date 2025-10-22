import React from "react";
import "./CreateFullFunctionPool.css";
import InputText from "../../../components/InputText/InputText";
import NameTag from "../../../components/NameTag/NameTag";
import Button from "../../../components/Button/Button";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";

const CreateFullFunctionPool: React.FC = () => {
  const [poolName, setPoolName] = React.useState<string>("");
  const [userField, setUserField] = React.useState<string>("");
  const [authField, setAuthField] = React.useState<string>("");
  const [needEmailValidation, setNeedEmailValidation] =
    React.useState<boolean>(false);
  const [accessTokenExpiry, setAccessTokenExpiry] = React.useState<number>(2);
  const [refreshTokenExpiry, setRefreshTokenExpiry] = React.useState<number>(7);
  const [selectedUserFields, setSelectedUserFields] = React.useState<string[]>(
    []
  );
  const [selectedAuthFields, setSelectedAuthFields] = React.useState<string[]>(
    []
  );
  const [fieldOptions, setFieldOptions] = React.useState<string[]>([
    "username",
    "email",
    "phoneNumber",
    "telCountryCode",
    "password",
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
        <small>Name already existed</small>
      </div>
      <div className="field-container">
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
        <div className="name-tags-container">
          {selectedUserFields.map((field) => (
            <NameTag key={field} name={field} onClick={() => {
              setSelectedUserFields(selectedUserFields.filter((item) => item !== field));
              setFieldOptions([...fieldOptions, field]);
            }}/>
          ))}
        </div>
        <span className="sub-scription">
          This is where you declare the fields you want to store in your user
          pool.
        </span>
      </div>
      <div className="field-container">
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
          onChange={(e) => setNeedEmailValidation(e.target.checked)}
        />
        <label htmlFor="needEmailValidation">
          Need email validation when sign up.
        </label>
      </div>

      <InputText
        stretch={false}
        type="number"
        onChange={(value) => setAccessTokenExpiry(Number(value))}
        value={accessTokenExpiry.toString()}
        lable="Access token expired minute"
        placeholder="..."
      />
      <InputText
        stretch={false}
        type="number"
        onChange={(value) => setRefreshTokenExpiry(Number(value))}
        value={refreshTokenExpiry.toString()}
        lable="Refresh token expired day"
        placeholder="..."
      />

      <Button
        tyle="tertiary"
        onClick={() => {}}
        label="Confirm created"
        borderRadius={3}
      />
    </div>
  );
};

export default CreateFullFunctionPool;
