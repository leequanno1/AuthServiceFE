import { useEffect, useState } from "react";
import "./UserInfoSceen.css";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import IconButton from "../../components/IconButton/IconButton";
import { DotsThreeVertical } from "phosphor-react";
import Account from "../../entities/account";
import accountService from "../../services/account-service";
import { DateService } from "../../services/date-service";

const UserInfoSceen: React.FC = () => {

  const location = useLocation();
  const { accountId } = useParams();
  const [subAccount, setSubAccount] = useState<Account|null>(null);

  useEffect(() => {
    const initSubAcc = async () => {
      const account = await accountService.getAccountByAccountId(accountId??"");
      if (!account) {
        //TODO: handle redirect not found
      } else {
        setSubAccount(account);
      }
    }
    initSubAcc();
  }, [accountId])

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
                  <strong>Account ID:</strong> {subAccount?.accountId}
                </span>
                <span>
                  <strong>Username:</strong> {subAccount?.username}
                </span>
                <span>
                  <strong>Display name:</strong> {subAccount?.displayName}
                </span>
                <span>
                  <strong>Email:</strong> {subAccount?.email}
                </span>
              </div>
              <div className="verticle-line"></div>
              <div className="profile-right">
                <span>
                  <strong>Created at:</strong> {DateService.formatDate(subAccount?.createdAt)}
                </span>
                <span>
                  <strong>Status:</strong> {subAccount?.active?"True":"False"}
                </span>
                <span>
                  <strong>Is deleted:</strong> {subAccount?.delFlag?"True":"False"}
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
            <div className="uif-outlet-container">
              <Outlet/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSceen;
