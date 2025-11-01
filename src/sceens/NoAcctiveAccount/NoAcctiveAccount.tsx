import { Navigate, useNavigate } from "react-router-dom";
import Header1 from "../../components/Header1/Header1";
import { getAccessTokenFromCookie } from "../../services/cookie-service";
import extractToken from "../../services/token-service";
import "./NoAcctiveAccount.css";
import Button from "../../components/Button/Button";
import accountService from "../../services/account-service";

const NoAcctiveAccount: React.FC = () => {
  const navigate = useNavigate();

  let redirect: string | null = null;
  const account = extractToken(getAccessTokenFromCookie());

  if (!account) {
    redirect = "/";
  } else if (!!account.active) {
    redirect = "/console-home";
  }
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className="view-port-ctn">
      <Header1 />
      <div className="aler-content">
        <h2>Account disabled.</h2>
        <div className="textcontent">
          Hello <strong>{account?.username}</strong>, your account has been
          disabled by an administrator.
        </div>
        <div className="textcontent">
            Please contact the admin to restore your access.
        </div>
        <div className="btn-ctn">
          <Button
            label="Sign out"
            onClick={() => {
              const rootID = account?.rootId;
              accountService.logout();
              navigate(`/login/${rootID}`, { replace: true });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoAcctiveAccount;
