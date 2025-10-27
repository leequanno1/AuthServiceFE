import { init_USER_POOL_POLICIES } from "../constants/policies/user-pool-policy";
import { Policy } from "../entities/policies";
import { UserPoolPolicies } from "../entities/user-pool-policies";
import accountStore from "../store/account.store";
import userPoolPoliciesStore from "../store/user-pool-policies.store";
import { api } from "./api-service";
import { getServerErrorCode } from "./error-code-service";

const poolPoliciesService = {
  refreshPoolPolicies: async () => {
    // get all pool policy that currnt account have
    const account = accountStore.getState().account;
    try {
      // get all pool policy by account id
      const response = await api.get(
        `/pool-policy/get-all/${account?.accountId}`
      );
      userPoolPoliciesStore
        .getState()
        .setUserPoolPolicies(response.data.result as UserPoolPolicies[]);
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Only use for current session account
   * @param poolID poolID
   * @returns UserPoolPolicies | undefined
   */
  getPolicyByPoolId: (poolID: string) => {
    return userPoolPoliciesStore
      .getState()
      .userPoolPoliciesMapByPoolID.get(poolID);
  },

  /**
   *
   * @param subAccID sub-account ID
   * @param poolID pool ID
   * @returns UserPoolPolicies
   */
  getPolicyBySubAccountId: async (subAccID: string, poolID: string) => {
    try {
      const response = await api.get(`/pool-policy/get/${subAccID}/${poolID}`);
      return response.data.result as UserPoolPolicies;
    } catch (error) {
      const errorCode = getServerErrorCode(error);
      switch (errorCode) {
        case 2001:
          return null;
        default:
          throw error;
      }
    }
  },

  /**
   *
   * @param plc User pool policies object
   * @returns a list of Policy object.
   */
  initPoolPolicyList: (plc: UserPoolPolicies | null | undefined) => {
    let tempPlcs: Policy[] = init_USER_POOL_POLICIES();
    if (plc) {
      tempPlcs = tempPlcs.map((item) => {
        switch (item.policyId) {
          case 1:
            item.selected = plc.canEdit ? true : false;
            break;
          case 2:
            item.selected = plc.canView ? true : false;
            break;
          case 3:
            item.selected = plc.canManage ? true : false;
            break;
        }
        return item;
      });
    }
    return tempPlcs;
  },

  attachUserPool: async (
    policies: Policy[],
    targetAccountId: string,
    poolID: string,
    policyId?: string
  ) => {
    let tempBody : any = {
      targetAccountId: targetAccountId,
      poolId: poolID,
      canView: false,
      canEdit: false,
      canManage: false,
    };

    if (policyId) {
        tempBody = {
            policyId: policyId,
            ...tempBody
        }
    }
    
    policies.forEach(plc => {
        const tempVal = plc.selected?true:false;
        switch (plc.policyId) {
            case 1:
                tempBody.canEdit = tempVal;
                break;
            case 2:
                tempBody.canView = tempVal;
                break;
            case 3:
                tempBody.canManage = tempVal;
                break;
        }
    });

    // attach to user
    try {
        await api.post(`/pool-policy/attach`, tempBody);
    } catch (error) {
        throw error;
    }
  },
};

export default poolPoliciesService;
