import React from "react";
import "./LoginForm.css";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";

const LoginForm: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", username, password);
  };

  return (
    <div className="login-form">
      <h2>Welcome Back</h2>
      <h3>Please login to your account</h3>
      <span className="spacer-10"></span>
      <InputText type="text" lable="Email Address/Username" placeholder="you@example.com" value={username} onChange={setUsername}/>
      <span className="spacer-10"></span>
      <InputText type="password" lable="Password" placeholder="••••••••" value={password} onChange={setPassword}/>
      <span className="spacer-10"></span>
      <div className="login-form-actions">
        <Button tyle="primary" label="Sign In" onClick={handleLogin}/>
        <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
      </div>
      <span className="flex-1"></span>
      <span className="login-form-divider">Don't have an account? <a href="/sign-up">Sign up</a></span>
    </div>
  );
};

export default LoginForm;