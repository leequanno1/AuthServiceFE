import Account from "./account";

export interface UserPool {
    poolId?: string;

    userFields?: string[];
    
    account?: Account;
    
    authorizeFields?: string[];
    
    poolKey?: string;
    
    createdAt?: Date;
    
    updatedAt?: Date;
    
    delFlag?: boolean;
    
    poolName?: string;
    
    emailVerify?: boolean;
    
    roleLevels?: string;
    
    accessExpiredMinutes?: number;
    
    refreshExpiredDays?: number;
}