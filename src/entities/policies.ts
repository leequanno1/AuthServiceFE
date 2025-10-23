export interface Policy {
    policyId?: number;
    policyName?: string;
    accessRange?: 1 | 2;
    selected?: boolean;
    type?: "accout_policy" | "pool_policy";
}