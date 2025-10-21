import "./SignUpForm.css";
import React from "react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import CountDownButton from "../../../components/CountDownButton/CountDownButton";
import { ArrowClockwise } from "phosphor-react";
import { Link } from "react-router-dom";
import LinkButton from "../../../components/LinkButton/LinkButton";
import { api } from "../../../services/api-service";
import { getServerErrorCode } from "../../../services/error-code-service";

const SignUpForm: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [accountID, setAccountID] = React.useState("");

  React.useEffect(() => {
    // Logic to handle step changes can be added here
  }, [step]);

  const checkExistingAccount = async (username: string, email: string) => {

    // check all field filled
    if (!username || !email || !password || !repeatPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // check password match
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    // check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      await api.get(`/account/check-existed/${null}/${email}/${username}`);
      // create account
      await api.post("/auth/register", {
        username: username,
        password: password,
        email: email,
        displayName: username
      });
      setError("");
      setStep(2);
      // send verification code
      const response = await api.post(`/account/send-code/${username}`);
      setAccountID(response.data.message);
    } catch (error) {
      if (getServerErrorCode(error) === 1003) {
        setError("Username already exists. Please choose another.");
      } else if (getServerErrorCode(error) === 1004) {
        setError("Email already registered. Please use another email.");
      }
    }
  }

  const handleVerification = async () => {
    if (!verificationCode) {
      setError("Please enter the verification code.");
      return;
    }

    try {
      await api.post(`/auth/active-user`, {
        "accountId": accountID,
        "code": verificationCode,
      });
      setError("");
      setStep(3);
    } catch (error) {
      console.log(getServerErrorCode(error));
      setError("Invalid verification code.");
    }
  };

  return (
    <div className="sign-up-form">
      {/*  
        SignUpForm step 1
      */}
      {step === 1 && (
        <div className="sign-up-form-1">
          <h2>Sign up</h2>
          <h3>Feel free to make a account</h3>
          <InputText
            type="text"
            onChange={setUsername}
            lable="Username"
            value={username}
            placeholder="your_username"
          />
          <span className="spacer-10"></span>
          <div className="password-inputs">
            <InputText
              stretch={false}
              onChange={setPassword}
              value={password}
              lable="Password"
              placeholder="••••••••"
              type="password"
            />
            <InputText
              stretch={false}
              onChange={setRepeatPassword}
              value={repeatPassword}
              lable="Repeat Password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <span className="spacer-10"></span>
          <div className="email-input-group">
            <InputText
              onChange={setEmail}
              type="email"
              stretch={false}
              value={email}
              lable="Email"
              placeholder="you@examle.com"
            />
            <Button
              borderRadius={15}
              label="Next"
              onClick={async () => {
                await checkExistingAccount(username, email);
              }}
            />
          </div>
          <span className="flex-1"></span>
          <small className="error global">{error}</small>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      )}

      {/*  
        SignUpForm step 2
      */}
      {step === 2 && (
        <div className="sign-up-form-2">
          <h2>Sign up</h2>
          <h3>Feel free to make a account</h3>
          <div className="form-2-group">
            <InputText
              stretch={false}
              onChange={setVerificationCode}
              value={verificationCode}
              lable="Verify code"
              placeholder="XXX XXX XXX"
              type="text"
            />
            <CountDownButton
              onClick={async () => {
                const response = await api.post(`/account/send-code/${username}`);
                setAccountID(response.data.message);
              }}
              timeLeft={10}
              Icon={ArrowClockwise}
            />
          </div>
          <small className="form-2-small">
            We have send a verification code to your email.
          </small>
          <div className="form-2-buttons">
            <Button
              borderRadius={15}
              label="Back"
              tyle="secondary"
              onClick={() => {
                setStep(1);
              }}
            />
            <Button
              borderRadius={15}
              label="Verify"
              tyle="primary"
              onClick={async () => {
                await handleVerification();
                
              }}
            />
          </div>
          <span className="flex-1"></span>
          <small className="error global">Error</small>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      )}

      {/*  
        SignUpForm step 3
      */}
      {step === 3 && (
        <div className="sign-up-form-3">
          <h2>Congratulation!</h2>
          <h3>Your registration is complete</h3>
          <span className="form-3-message">
            Start your own experience with our service.
          </span>
          <div className="form-3-buttons">
            <LinkButton label={"Go to Login"} to={"/login"} type="primary" />
          </div>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
