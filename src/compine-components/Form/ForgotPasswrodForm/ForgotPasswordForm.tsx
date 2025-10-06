import React from "react";
import "./ForgotPasswordForm.css";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import CountDownButton from "../../../components/CountDownButton/CountDownButton";
import { ArrowClockwise } from "phosphor-react";
import { Link } from "react-router-dom";
import LinkButton from "../../../components/LinkButton/LinkButton";

const ForgotPasswordForm: React.FC = () => {

    const [step, setStep] = React.useState(1);
    const [usernameOrMail, setUsernameOrMail] = React.useState("");
    const [verificationCode, setVerificationCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");

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
                        placeholder="you@example.com" />
                    <small className="input-hint">We will send a verification code to your registered email.</small>
                    <Button label="Next" onClick={() => setStep(2)} />
                    <span className="flex-1"></span>
                    <span className="form-consider">Already have an account? <Link to="/login">Login</Link></span>
                    <span className="form-consider">or <Link to="/sign-up">Sign up</Link></span>
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
                            placeholder="XXX XXX XXX" />
                        <CountDownButton Icon={ArrowClockwise} timeLeft={10} onClick={() => { }} />
                    </div>
                    <small className="input-hint">We have send a verification code to your email.</small>
                    <Button label="Verify" onClick={() => setStep(3)} />
                    <span className="flex-1"></span>
                    <span className="form-consider">Already have an account? <Link to="/login">Login</Link></span>
                    <span className="form-consider">or <Link to="/sign-up">Sign up</Link></span>
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
                        placeholder="••••••••" />
                    <span className="spacer-10"></span>
                    <InputText
                        type="text"
                        onChange={setRepeatPassword}
                        lable="Repeat password"
                        value={repeatPassword}
                        placeholder="••••••••" />
                    <span className="spacer-20"></span>
                    <Button label="Verify" onClick={() => setStep(4)} />
                    <span className="flex-1"></span>
                    <span className="form-consider">Already have an account? <Link to="/login">Login</Link></span>
                    <span className="form-consider">or <Link to="/sign-up">Sign up</Link></span>
                </div>
            )}

            {/*  
                Forgot password step 3
            */}
            {step === 4 && (
                <div className="forgot-pass-form-4">
                    <h2>Congratulation!</h2>
                    <h3>Your password has been restored</h3>
                    <span className="form-4-message">Start your own experience with our service.</span>
                    <div className="form-4-buttons">
                        <LinkButton label={"Go to Login"} to={"/login"} type="primary"/>
                    </div>
                    <span className="flex-1"></span>
                    <span className="form-consider">Already have an account? <Link to="/login">Login</Link></span>
                    <span className="form-consider">or <Link to="/sign-up">Sign up</Link></span>
                </div>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
