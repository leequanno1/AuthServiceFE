import { init_ACCOUNT_POLICIES } from "../constants/policies/account-policy";
import { AccountPolicies } from "../entities/account-policies";
import { Policy } from "../entities/policies";
import { api } from "./api-service";
import policyService from "./policy-service";

export const accountPoliciesService = {
  getAccountPolicies: async (targetAccID: string) => {
    const response = await api.get(
      `/account-policy/get-by-acc-id/${targetAccID}`
    );
    return response.data.result as AccountPolicies;
  },

  initAccountPoliciesList: (policies: AccountPolicies) => {
    let tempPlcs = init_ACCOUNT_POLICIES();
    if (policies) {
      tempPlcs = tempPlcs.map((item) => {
        switch (item.policyId) {
          case 1:
            if (policies.canCreate) {
              item.selected = !!policies.canCreate;
            }
            break;
          case 2:
            if (policies.canView) {
              item.selected = !!policies.canView;
            }
            break;
          case 3:
            if (policies.canDelete) {
              item.selected = !!policies.canDelete;
            }
            break;
        }
        return item;
      });
    }
    return tempPlcs;
  },

  attachAccountPolices: async (
    targetAccountId: string,
    plcList: Policy[],
    policyId?: string
  ) => {
    let body: any = {
      targetAccountId,
      canCreate: false,
      canView: false,
      canDelete: false,
    };

    if (!!policyId) {
      body = {
        policyId,
        ...body,
      };
    }

    if (plcList) {
      plcList.forEach((plc) => {
        switch (plc.policyId) {
          case 1:
            body.canCreate = !!plc.selected;
            break;
          case 2:
            body.canView = !!plc.selected;
            break;
          case 3:
            body.canDelete = !!plc.selected;
            break;
        }
      });
    }

    const response = await api.post("/account-policy/attach", body);
    return response.data.message as string;
  },
};
