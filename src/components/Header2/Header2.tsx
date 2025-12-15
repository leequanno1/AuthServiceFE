import React, { useState } from "react";
import "./Header2.css";
import IconButton from "../IconButton/IconButton";
import { Gear } from "phosphor-react";
import { CaretDownFill } from "react-bootstrap-icons";
import { getAccessTokenFromCookie } from "../../services/cookie-service";
import { Link, useNavigate } from "react-router-dom";
import accountService from "../../services/account-service";
import accountStore from "../../store/account.store";
import extractToken from "../../services/token-service";
import FixedDropdown from "../FixedDropdown/FixedDropdown";
import CustomizablePopup from "../CustomizablePopup/CustomizablePopup";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import { getServerErrorCode } from "../../services/error-code-service";
import { toastService } from "../../services/toast-service";

const Header2: React.FC = () => {
  accountService.getAccountDetails();
  const account = accountStore.getState().account;
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const toShortyId = (id: string): string => {
    if (id.length <= 8) return id;
    return id.slice(0, 5) + "..." + id.slice(-3);
  };

  return (
    <header>
      <Link to="/console-home" className="logo">
        <h1 className="app-logo">Authify</h1>
      </Link>
      <div className="head-left-container">
        <IconButton Icon={Gear} IconSize={30} onClick={() => {}} />
        <div className="vertical-line"></div>
        <FixedDropdown
          items={[
            {
              label: (
                <CustomizablePopup
                  content={<EditUserNameForm oldDisplayName={account?.displayName}/>}
                  children={<div>Change display name</div>}
                />
              ),
              onClick: () => {},
            },
            {
              label: (
                <CustomizablePopup
                  content={<ChangePasswordForm/>}
                  children={<div>Change password</div>}
                />
              ),
              onClick: () => {},
            },
            {
              label: (
                <ConfirmPopup
                  title="Sign out"
                  description="Are you want to sign out?"
                  children={"Log out"}
                  onAccept={() => {
                    const crAcc = extractToken(getAccessTokenFromCookie());
                    const rootID = crAcc?.rootId ?? null;
                    accountService.logout();
                    if (rootID) {
                      navigate(`/login/${rootID}`, { replace: true });
                    } else {
                      navigate("/", { replace: true });
                    }
                  }}
                />
              ),
              onClick: () => {},
            },
          ]}
          children={
            <div
              className="profile-container"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <div>
                <span title={account?.username} className="username">
                  {account?.username}
                </span>
                /
                <span title={account?.accountId} className="shorty-id">
                  {toShortyId(account?.accountId || "example_random_id")}
                </span>
              </div>
              <CaretDownFill
                className={`expandable ${isExpanded ? "expanded" : ""}`}
                size={12}
                color="var(--text-color)"
              />
            </div>
          }
        />
      </div>
    </header>
  );
};

const ChangePasswordForm : React.FC<{
  onClose?: () => void,
}> = ({
  onClose = () => {},
}) => {

  const [oldPassword, setOldPass] = useState<string>("");
  const [newPassword, setNewPass] = useState<string>("");
  const [repeatPassword, setRepeatPass] = useState<string>("");
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const ERR_WRONG_OLD_PASS = "Your old password is incorrect. Please check again";
  const ERR_FIELDS_REQUIRED = "Please fill all the fields.";
  const ERR_REPEAT_NOT_MATCH = "Your repeat password is not match. Please check again";

  return (
    <div className="change-password-form-ctn" style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}>
      <h3 style={{
        fontWeight:"600",
        fontSize: "20px"
      }}>Change display name</h3>
      <InputText
        value={oldPassword}
        type="password"
        onChange={(text) => setOldPass(text)}
        lable="Old password"
        placeholder={"••••••••"}
      />
      <InputText
        value={newPassword}
        type="password"
        onChange={(text) => setNewPass(text)}
        lable="New password"
        placeholder={"••••••••"}
      />
      <InputText
        value={repeatPassword}
        type="password"
        onChange={(text) => setRepeatPass(text)}
        lable="Repeat password"
        placeholder={"••••••••"}
      />
      <small style={{
        minHeight:"18px",
        fontSize:"13px",
        color: "var(--danger-color)"
      }}>
        {(!!errorCode && errorCode === 1011) && ERR_WRONG_OLD_PASS}
        {(!!errorCode && errorCode === 1) && ERR_FIELDS_REQUIRED}
        {(!!errorCode && errorCode === 2) && ERR_REPEAT_NOT_MATCH}
      </small>
      <div style={{
        display:"flex",
        justifyContent:"end",
        gap: "10px",
      }}>
        <Button
          borderRadius={7}
          label="Cancel"
          onClick={() => {
            onClose();
          }}
          tyle="secondary"
        />
        <Button
          borderRadius={7}
          label="Change"
          onClick={async () => {
            // check bank line
            setErrorCode(null);
            if (!oldPassword || !newPassword || !repeatPassword) {
              setErrorCode(1);
              return;
            }

            if (newPassword.trim() !== repeatPassword.trim()) {
              setErrorCode(2);
              return;
            }

            try {
              await accountService.changePassword(oldPassword, newPassword);
              toastService.toast("Password changed successfully");
              onClose();
            } catch (error) {
              setErrorCode(getServerErrorCode(error));
            }
          }}
          tyle="primary"
        />
      </div>
    </div>
  );
}

const EditUserNameForm: React.FC<{
  oldDisplayName?: string,
  onClose?: () => void;
}> = ({ 
  oldDisplayName = "",
  onClose = () => {}, 
}) => {
  const ERR_BLANK = "Please fill your new display name";
  const [isErr, setErr] = useState<boolean>(false);
  const [newDName, setDName] = useState<string>(oldDisplayName);
  return (
    <div className="edit-name-form-ctn" style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}>
      <h3 style={{
        fontWeight:"600",
        fontSize: "20px"
      }}>Change display name</h3>
      <InputText
        value={newDName}
        onChange={(text) => setDName(text)}
        lable="Display name"
        placeholder={"Your name"}
      />
      <small style={{
        minHeight:"18px",
        fontSize:"13px",
        color: "var(--danger-color)"
      }}>{isErr ? ERR_BLANK : ""}</small>
      <div style={{
        display:"flex",
        justifyContent:"end",
        gap: "10px",
      }}>
        <Button
          borderRadius={7}
          label="Cancel"
          onClick={() => {
            onClose();
          }}
          tyle="secondary"
        />
        <Button
          borderRadius={7}
          label="Change"
          onClick={ async () => {
            
            if (newDName) {
              await accountService.updateDisplayName(newDName)
              onClose();
              return;
            }
            setErr(true);
          }}
          tyle="primary"
        />
      </div>
    </div>
  );
};

export default Header2;
