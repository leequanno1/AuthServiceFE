import React from "react";
import "./ConsoleHome.css"
import UserPoolTable from "../../compine-components/Table/UserPoolTable/UserPoolTable";
import UserTable from "../../compine-components/Table/UserTable/UserTable";
import LinkButton from "../../components/LinkButton/LinkButton";
import { AccountPolicies } from "../../entities/account-policies";
import accountService from "../../services/account-service";
import { accountPoliciesService } from "../../services/account-policies-service";
import accountStore from "../../store/account.store";

const ConsoleHome: React.FC = () => {

    const [crAccPolicy, setCrAccPolicy] = React.useState<AccountPolicies | null>(null);

    React.useEffect(() => {
        const initStaterData = async () => {
            if (!accountService.isRoot()) {
                const tmpAccPlc = await accountPoliciesService
                    .getAccountPolicies(accountStore.getState().account?.accountId??"");
                setCrAccPolicy(tmpAccPlc);
            }
        }

        initStaterData();
    }, [])

    return (
        <div className="console-home-container">
            <div className="cs-header-container">
                <h1 className="cs-header">Console Home</h1>
                {(accountService.isRoot() || crAccPolicy?.canCreate) && (
                    <LinkButton to="/account-control/create" label="+ Add new user" type="tertiary" borderRadius={3}/>
                )}
                {(accountService.isRoot()) && (
                    <LinkButton to="/pool-control/create" label="+ Add new pool" type="tertiary" borderRadius={3} />
                )}
            </div>
            <div className="cs-table-container">
                <UserTable tableTitle="Account Access Control"/>
                <UserPoolTable tableName="User Pools Control"/>
            </div>
        </div>
    );
}

export default ConsoleHome;