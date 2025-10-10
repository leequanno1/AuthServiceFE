export interface UserPoolPolicies {
    poolId?: string;
    
    accountId?: string;
    
    rootId?: string;
    
    creatorId?: string;
    
    lastEditorId?: string;
    
    viewableTargets?: string[]; // poolIds that "account" user can view
    
    editableTargets?: string[]; // poolIds that "account" user can edit
    
    manageableTargets?: string[]; // poolIds that "account" user can manage
    
    createdAt?: Date;
    
    updatedAt?: Date;
    
    delFlag?: boolean;

}