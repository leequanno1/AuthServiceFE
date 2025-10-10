export interface Policy {
    policyId?: number;
    policyName?: string;
    accessRange?: number;
    selected?: boolean;
    type?: "accout_policy" | "pool_policy";
}