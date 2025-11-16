import { useState } from "react";
import "./LoginSubAccountForm.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import accountService from "../../../services/account-service";
import { getServerErrorCode } from "../../../services/error-code-service";

const LoginSubAccountForm: React.FC = () => {
  const { rootID } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Handle login logic here
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    try {
      await accountService.subLogin(rootID??"", username, password);
      navigate("/console-home", { replace: true });
    } catch (err: any) {
      if (getServerErrorCode(err) === 1002) {
        setError("Wrong password. Please try again.");
      } else if (getServerErrorCode(err) === 1001) {
        setError("Account does not exist. Please sign up.");
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Welcome Back</h2>
      <h3>Please login to your account</h3>
      <span className="spacer-10"></span>
      <InputText
        type="text"
        lable="Email Address/Username"
        placeholder="you@example.com"
        value={username}
        onChange={setUsername}
      />
      <span className="spacer-10"></span>
      <InputText
        type="password"
        lable="Password"
        placeholder="••••••••"
        value={password}
        onChange={setPassword}
      />
      <span className="spacer-10"></span>
      <div className="login-form-actions">
        <Button tyle="primary" label="Sign In" onClick={handleLogin} />
      </div>
      <span className="flex-1"></span>
      <small className="error global">{error}</small>
      <span className="flex-1"></span>
      <span className="login-form-divider">
        Group ID: {rootID}
      </span>
      <span style={{marginTop:10}} className="login-form-divider">
        <Link to={"/"}>Login with root account.</Link>
      </span>
    </div>
  );
};

export default LoginSubAccountForm;
