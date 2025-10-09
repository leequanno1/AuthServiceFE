import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartScreen from "./sceens/StartScreen/StartScreen";
import LoginForm from "./compine-components/Form/LoginForm/LoginForm";
import SignUpForm from "./compine-components/Form/SignUpForm/SignUpForm";
import ForgotPasswordForm from "./compine-components/Form/ForgotPasswrodForm/ForgotPasswordForm";
import Frame from "./sceens/Frame/Frame";
import ConsoleHome from "./sceens/ConsoleHome/ConsoleHome";
import AccountAccessControl from "./sceens/AccountAccessControl/AccountAccessControl";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Path = "/" */}
        <Route path="/" element={<StartScreen />}>
          <Route index element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/forgot" element={<ForgotPasswordForm />} />
        </Route>
        {/* Path = "/dash-board" */}
        <Route path="/dash-board" element={<Frame />}>
          <Route index element={<ConsoleHome/>} />
          <Route path="console-home" element={<ConsoleHome/>} />
          <Route path="account-control" element={<AccountAccessControl/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
