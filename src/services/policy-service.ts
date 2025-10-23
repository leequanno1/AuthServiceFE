import { ACCOUNT_POLICIES } from "../constants/policies/account-policy";
import { USER_POOL_POLICIES } from "../constants/policies/user-pool-policy";
import { AccountPolicies } from "../entities/account-policies";
import { Policy } from "../entities/policies";
import { UserPoolPolicies } from "../entities/user-pool-policies";
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

  getStaterUserPoolPolicies: async (poolId: string) => {
    const account = accountStore.getState().account;

    if (!account?.rootId) {
      return USER_POOL_POLICIES;
    } else {
      // get account policy
      const response = await api.get(
        `/pool-policy/get/${account?.accountId}/${poolId}`
      );
      const accPolicies = response.data.result as UserPoolPolicies;
      let policies: Policy[] = [];
      if (accPolicies.canEdit) {
        policies.push(USER_POOL_POLICIES[0]);
      }
      if (accPolicies.canView) {
        policies.push(USER_POOL_POLICIES[1]);
      }
      if (accPolicies.canManage) {
        policies.push(USER_POOL_POLICIES[2]);
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

  toPoolPoliciesRqBody: (policies: Policy[]) => {},
};

export default policyService;
