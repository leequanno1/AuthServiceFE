import React from "react";
import "./UserInfoSceen.css";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import IconButton from "../../components/IconButton/IconButton";
import { DotsThreeVertical } from "phosphor-react";

const UserInfoSceen: React.FC = () => {

  const location = useLocation();
  const { accountId } = useParams();

  return (
    <div className="user-infomation-container">
      <h1>User information</h1>
      <div className="scrollable-container">
        {/* Top component */}
        <Card
          minWidth={"100%"}
          title="User Profile"
          optionButtons={
            <IconButton
              onClick={() => {}}
              Icon={DotsThreeVertical}
              IconSize={24}
              IconWeight="bold"
            />
          }
          content={
            <div className="profile-content">
              <div className="profile-left">
                <span>
                  <strong>Account ID:</strong> {accountId}
                </span>
                <span>
                  <strong>Username:</strong> random-username
                </span>
                <span>
                  <strong>Display name:</strong> Random Name
                </span>
                <span>
                  <strong>Email:</strong> example@mail.com
                </span>
              </div>
              <div className="verticle-line"></div>
              <div className="profile-right">
                <span>
                  <strong>Created at:</strong> YYYY/MM/DD
                </span>
                <span>
                  <strong>Status:</strong> Active
                </span>
                <span>
                  <strong>Is deleted:</strong> False
                </span>
              </div>
            </div>
          }
        />

        {/* Bottom component */}
        <div className="sub-info-container">
            <div className="tab-container">
                <Link className={location.pathname.endsWith("sub-users") ? "" : "active"} to={`/account-control/user/${accountId}/pools`} >Pools and Policies</Link>
                <Link className={location.pathname.endsWith("sub-users") ? "active" : ""} to={`/account-control/user/${accountId}/sub-users`} >Sub-user and Policies</Link>
            </div>
            <div className="outlet-container">
              <Outlet/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSceen;
