import React from "react";
import "./Header2.css";
import IconButton from "../IconButton/IconButton";
import { Gear } from "phosphor-react";
import { CaretDownFill } from "react-bootstrap-icons";
import DropdownButton from "../DropdownButton/DropdownButton";
import { removeCookie } from "../../services/cookie-service";
import { Link, useNavigate } from "react-router-dom";
import accountService from "../../services/account-service"
import accountStore from "../../store/account.store";

const Header2: React.FC = () => {
  accountService.getAccountDetails();
  const account = accountStore.getState().account;
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const navigate = useNavigate();
  
  const toShortyId = (id: string): string => {
    if (id.length <= 8) return id;
    return id.slice(0, 5) + "..." + id.slice(-3);
  }

  return (
    <header>
      <Link to="/console-home"  className="logo"><h1 className="app-logo">Authify</h1></Link>
      <div className="head-left-container">
        <IconButton Icon={Gear} IconSize={30} onClick={() => {}} />
        <div className="vertical-line"></div>
        <DropdownButton
          keepOpenOnFocus={true}
          align="center"
          items={[
            { label: "Profile" },
            {
              label: "Log out",
              onClick: () => {
                removeCookie("accessToken");
                removeCookie("refreshToken");
                navigate("/", { replace: true });
              },
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
                <span title={account?.username} className="username">{account?.username}</span>/
                <span title={account?.accountId} className="shorty-id">{toShortyId(account?.accountId || "example_random_id")}</span>
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

export default Header2;
