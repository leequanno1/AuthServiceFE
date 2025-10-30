import { Policy } from "../../entities/policies";

export const init_ACCOUNT_POLICIES = () => {
  return [
    {
      policyId: 1,
      policyName: "Allow create and update account",
      accessRange: 2,
      selected: false,
      type: "accout_policy",
    },
    {
      policyId: 2,
      policyName: "Allow view account infomation",
      accessRange: 1,
      selected: false,
      type: "accout_policy",
    },
    {
      policyId: 3,
      policyName: "Allow delete account",
      accessRange: 2,
      selected: false,
      type: "accout_policy",
    },
  ] as Policy[];
};
