import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartScreen from "./sceens/StartScreen/StartScreen";
import LoginForm from "./compine-components/Form/LoginForm/LoginForm";
import SignUpForm from "./compine-components/Form/SignUpForm/SignUpForm";
import ForgotPasswordForm from "./compine-components/Form/ForgotPasswrodForm/ForgotPasswordForm";
import Frame from "./sceens/Frame/Frame";
import ConsoleHome from "./sceens/ConsoleHome/ConsoleHome";
import AccountAccessControl from "./sceens/AccountAccessControl/AccountAccessControl";
import CreateSubUser from "./sceens/CreateSubUser/CreateSubUser";
import UserInfoSceen from "./sceens/UserInfoSceen/UserInfoSceen";
import PoolAndPoliciesInfo from "./compine-components/SectionPart/PoolAndPoliciesInfo/PoolAndPoliciesInfo";
import SubUserAndPoliciesInfo from "./compine-components/SectionPart/SubUserAndPoliciesInfo/SubUserAndPoliciesInfo";
import UserPoolControl from "./sceens/UserPoolControl/UserPoolControl";
import UserPoolInfoScreen from "./sceens/UserPoolInfoScreen/UserPoolInfoScreen";

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
        {/* Path = /dash-board */}
        <Route path="/console-home" element={<Frame />}>
          <Route index element={<ConsoleHome/>} />
        </Route>
        {/* Path = /account-control */}
        <Route path="/account-control" element={<Frame />}>
          <Route index element={<AccountAccessControl/>} />
          <Route path="create" element={<CreateSubUser/>} />
          <Route path="user/:accountId" element={<UserInfoSceen/>} >
            <Route index element={<PoolAndPoliciesInfo />} />
            <Route path="pools" element={<PoolAndPoliciesInfo />} />
            <Route path="sub-users" element={<SubUserAndPoliciesInfo />} />
          </Route>
        </Route>

        <Route path="/pool-control" element={<Frame />}>
          <Route index element={<UserPoolControl/>} />
          <Route path="pool/:poolID" element={<UserPoolInfoScreen/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
