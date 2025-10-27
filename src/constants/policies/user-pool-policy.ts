import { Policy } from "../../entities/policies";

export const init_USER_POOL_POLICIES = () => {
    return [
        {policyId:1,policyName:"Allow edit user pool",accessRange:2, selected:false,type:"pool_policy"},
        {policyId:2,policyName:"Allow view pool infomation",accessRange:1, selected:false,type:"pool_policy"},
        {policyId:3,policyName:"Allow manage user pool",accessRange:2, selected:false,type:"pool_policy"},
    ] as Policy[];
}