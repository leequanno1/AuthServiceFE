import { create } from "zustand";
import { UserPoolPolicies } from "../entities/user-pool-policies";

interface UserPoolPoliciesState {
    userPoolPolicies: UserPoolPolicies[],
    userPoolPoliciesMap: Map<string, UserPoolPolicies>,
    userPoolPoliciesMapByPoolID: Map<string, UserPoolPolicies>,
    setUserPoolPolicies: (upps: UserPoolPolicies[]) => void,
}

const userPoolPoliciesStore = create<UserPoolPoliciesState>((set) => ({
    userPoolPolicies : [],
    userPoolPoliciesMap : new Map<string, UserPoolPolicies>(),
    userPoolPoliciesMapByPoolID: new Map<string, UserPoolPolicies>(),
    setUserPoolPolicies : (upps) => set({
        userPoolPolicies : upps,
        userPoolPoliciesMap: new Map(upps.map(item => [item.policyId??"", item])),
        userPoolPoliciesMapByPoolID: new Map(upps.map(item => [item.userPoolId??"", item])),
    })
}));

export default userPoolPoliciesStore;