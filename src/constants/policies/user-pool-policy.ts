import { Policy } from "../../entities/policies";

export const USER_POOL_POLICIES : Policy[] = [
    {policyId:1,policyName:"Allow edit user pool",accessRange:2, selected:false,type:"pool_policy"},
    {policyId:2,policyName:"Allow view pool infomation",accessRange:1, selected:false,type:"pool_policy"},
    {policyId:3,policyName:"Allow manage user pool",accessRange:2, selected:false,type:"pool_policy"},
]