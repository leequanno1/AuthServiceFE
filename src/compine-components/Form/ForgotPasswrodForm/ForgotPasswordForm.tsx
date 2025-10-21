import React from "react";
import "./ForgotPasswordForm.css";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import CountDownButton from "../../../components/CountDownButton/CountDownButton";
import { ArrowClockwise } from "phosphor-react";
import { Link } from "react-router-dom";
import LinkButton from "../../../components/LinkButton/LinkButton";
import { api } from "../../../services/api-service";

const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [usernameOrMail, setUsernameOrMail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [accountId, setAccountId] = React.useState("");
  const [validationId, setValidationId] = React.useState("");

  const handleForm1 = async () => {

    // check if account or mail not null
    if (!usernameOrMail) {
      setError("Please enter your email or username.");
      return;
    }

    try {
      const response = await api.post(`/account/send-code/${usernameOrMail}`);
      setAccountId(response.data.message);
      setError("");
      setStep(2);
    } catch (error) {
      setError("Email or username not found.");
    }
  };

  const handleForm2 = async () => {

    if (!verificationCode) {
      setError("Please enter the verification code.");
      return;
    }

    try {
      const response = await api.post(`/account/validate-code`, {
        accountId: accountId,
        code: verificationCode,
      });

      setValidationId(response.data.message);
      setError("");
      setStep(3);
    } catch (error) {
      setError("Invalid verification code. Please try again.");
    }
  }

  const handleForm3 = async () => {

    if (!password || !repeatPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      await api.post(`/account/reset-forgot-password`, {
        validationID: validationId,
        newPassword: password
      });

      setError("");
      setStep(4);
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  }

  return (
    <div className="forgot-pass-form">
      {/*  
                Forgot password step 1
            */}
      {step === 1 && (
        <div className="forgot-pass-form-1">
          <h2>Forgot Password?</h2>
          <h3>Please enter your account infomation</h3>
          <InputText
            type="text"
            onChange={setUsernameOrMail}
            lable="Email Address/Username"
            value={usernameOrMail}
            placeholder="you@example.com"
          />
          <small className="input-hint">
            We will send a verification code to your registered email.
          </small>
          <Button
            label="Next"
            onClick={ async () => {
              await handleForm1();
            }}
          />
          <span className="flex-1"></span>
          <small className="error global">{error}</small>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <span className="form-consider">
            or <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      )}

      {/*  
                Forgot password step 2
            */}
      {step === 2 && (
        <div className="forgot-pass-form-2">
          <h2>Forgot Password?</h2>
          <h3>Please enter your verification code</h3>
          <div className="form-2-group">
            <InputText
              type="text"
              onChange={setVerificationCode}
              lable="Verify code"
              value={verificationCode}
              placeholder="XXX XXX XXX"
            />
            <CountDownButton
              Icon={ArrowClockwise}
              timeLeft={10}
              onClick={async () => {
                const response = await api.post(`/account/send-code/${usernameOrMail}`);
                setAccountId(response.data.message);
              }}
            />
          </div>
          <small className="input-hint">
            We have send a verification code to your email.
          </small>
          <Button label="Verify" onClick={ async () => {
            await handleForm2();
          } } />
          <span className="flex-1"></span>
          <small className="error global">{error}</small>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <span className="form-consider">
            or <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      )}

      {/*  
                Forgot password step 3
            */}
      {step === 3 && (
        <div className="forgot-pass-form-3">
          <h2>Forgot Password?</h2>
          <h3>Please enter your verification code</h3>
          <InputText
            type="text"
            onChange={setPassword}
            lable="New password"
            value={password}
            placeholder="••••••••"
          />
          <span className="spacer-10"></span>
          <InputText
            type="text"
            onChange={setRepeatPassword}
            lable="Repeat password"
            value={repeatPassword}
            placeholder="••••••••"
          />
          <span className="spacer-20"></span>
          <Button label="Verify" onClick={ async () => {
            await handleForm3();
          } } />
          <span className="flex-1"></span>
          <small className="error global">{error}</small>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <span className="form-consider">
            or <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      )}

      {/*  
                Forgot password step 3
            */}
      {step === 4 && (
        <div className="forgot-pass-form-4">
          <h2>Congratulation!</h2>
          <h3>Your password has been restored</h3>
          <span className="form-4-message">
            Start your own experience with our service.
          </span>
          <div className="form-4-buttons">
            <LinkButton label={"Go to Login"} to={"/login"} type="primary" />
          </div>
          <span className="flex-1"></span>
          <span className="form-consider">
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <span className="form-consider">
            or <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
