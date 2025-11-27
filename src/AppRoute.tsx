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
import AccessableUsers from "./sceens/UserPoolInfoScreen/AccessableUsers/AccessableUsers";
import Monitoring from "./sceens/UserPoolInfoScreen/Monitoring/Monitoring";
import UserData from "./sceens/UserPoolInfoScreen/UserData/UserData";
import CreateUserPool from "./sceens/CreateUserPool/CreateUserPool";
import CreateFullFunctionPool from "./compine-components/SectionPart/CreateUserPool/CreateFullFunctionPool";
import CreateEmptyPool from "./compine-components/SectionPart/CreateUserPool/CreateEmptyPool";
import HaveTokenNavigate from "./route-wrapper/HaveTokenNavidate/HaveTokenNavigate";
import NoTokenNavigate from "./route-wrapper/NoTokenNavigate/NoTokenNavigate";
import LoginSubAccountForm from "./compine-components/Form/LoginSubAccountForm/LoginSubAccountForm";
import NoAcctiveAccount from "./sceens/NoAcctiveAccount/NoAcctiveAccount";
import UpdateUserPool from "./sceens/UpdateUserPool/UpdateUserPool";
import NotFound from "./sceens/NotFound/NotFound";
import DocsPage from "./sceens/DocsPage/DocsPage";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Path = "/" */}
        <Route path="/" element={<HaveTokenNavigate><StartScreen /></HaveTokenNavigate>}>
          <Route index element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/forgot" element={<ForgotPasswordForm />} />
          <Route path="/login/:rootID" element={<LoginSubAccountForm />} />
        </Route>
        {/* Path = /dash-board */}
        <Route path="/no-active" element={<NoAcctiveAccount/>}></Route>
        <Route path="/console-home" element={<NoTokenNavigate><Frame /></NoTokenNavigate>}>
          <Route index element={<ConsoleHome />} />
        </Route>
        {/* Path = /account-control */}
        <Route path="/account-control" element={<NoTokenNavigate><Frame /></NoTokenNavigate>}>
          <Route index element={<AccountAccessControl />} />
          <Route path="create" element={<CreateSubUser />} />
          <Route path="user/:accountId" element={<UserInfoSceen />}>
            <Route index element={<PoolAndPoliciesInfo />} />
            <Route path="pools" element={<PoolAndPoliciesInfo />} />
            <Route path="sub-users" element={<SubUserAndPoliciesInfo />} />
          </Route>
        </Route>

        <Route path="/pool-control" element={<NoTokenNavigate><Frame /></NoTokenNavigate>}>
          <Route index element={<UserPoolControl />} />
          <Route path="update/:poolID" element={<UpdateUserPool />}/>
          <Route path="create" element={<CreateUserPool />}>
            <Route index element={<CreateFullFunctionPool/>} />
            <Route path="empty-function" element={<CreateEmptyPool/>} />
          </Route>
          <Route path="pool/:poolID" element={<UserPoolInfoScreen />}>
            <Route index element={<AccessableUsers />} />
            <Route path="monitor" element={<Monitoring />} />
            <Route path="user-data" element={<UserData />} />
          </Route>
        </Route>

        <Route path="/docs" element={<DocsPage/>}></Route>

        <Route path="/page-not-found" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
