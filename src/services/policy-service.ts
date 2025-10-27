import { ACCOUNT_POLICIES } from "../constants/policies/account-policy";
import { AccountPolicies } from "../entities/account-policies";
import { Policy } from "../entities/policies";
import accountStore from "../store/account.store";
import accountService from "./account-service";
import { api } from "./api-service";

const policyService = {
  
  isRootAccount: () => {
    accountService.getAccountDetails();
    const account = accountStore.getState().account;

    return !account?.rootId;
  },

  getStaterAccountPolicies: async () => {
    const account = accountStore.getState().account;

    if (!account?.rootId) {
      return ACCOUNT_POLICIES;
    } else {
      // get account policy
      const response = await api.get(
        `/account-policy/get/${account?.accountId}`
      );
      const accPolicies = response.data.result as AccountPolicies;
      let policies: Policy[] = [];
      if (accPolicies.canCreate) {
        policies.push(ACCOUNT_POLICIES[0]);
      }
      if (accPolicies.canView) {
        policies.push(ACCOUNT_POLICIES[1]);
      }
      if (accPolicies.canDelete) {
        policies.push(ACCOUNT_POLICIES[2]);
      }
      return policies;
    }
  },

  toAccountPoliciesRqBody: (
    policies: Policy[],
    targetAccountId: string,
    policyId?: string
  ) => {
    let body:any = {
      targetAccountId,
      canCreate: false,
      canView: false,
      canDelete: false,
    };

    if (policyId) {
        body = {
            policyId,
            ...body,
        }
    }
    
    if (policies) {
        policies.forEach((plc) => {
            if (plc.policyId === 1) { body.canCreate = true }
            if (plc.policyId === 2) { body.canView = true }
            if (plc.policyId === 3) { body.canDelete = true }
        })
    }

    return body;
  },

  // policies is type of AccountPolicies or UserPoolPolicies
  // Return 0: No authority
  // Return 1: View
  // Return 2: Edit
  // Return 3: Both
  getPoolAccessLevel: (policies: any) => {
    let accessLvl = 0;
    if (!policies) {
      return accessLvl;
    }
    if ("userPoolId" in policies) {
      // is UserPoolPolicies;
      if (policies.canView) {
        accessLvl = 1;
      }
      if (policies.canEdit || policies.canManage) {
        if (accessLvl === 1) {
          accessLvl = 3;
        } else {
          accessLvl = 2;
        }
      }
    } else {
      // is AccountPolicies
      if (policies.canView) {
        accessLvl = 1;
      }
      if (policies.canCreate || policies.canDelete) {
        if (accessLvl === 1) {
          accessLvl = 3;
        } else {
          accessLvl = 2;
        }
      }
    }
    return accessLvl;
  },
};

export default policyService;
