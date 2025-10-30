import Account from "../entities/account";
import { UserPool } from "../entities/user-pool";
import accountStore from "../store/account.store";
import userPoolStore from "../store/user-pool.store";
import accountService from "./account-service";
import { api } from "./api-service";

const userPoolService = {
    
    refreshUserPool: async () => {
        // get all pool policy that currnt account have
        try {
            // get all pool policy by account id
            let pools:UserPool[];
            let account = accountStore.getState().account;
            if (accountService.isRoot()) {
                const response = await api.get(`/user-pool/get-all/${false}`);
                pools = response.data.result as UserPool[];
            } else {
                const response = await api.get(`/user-pool/get-attached-by-acc-id/${account?.accountId}`);
                pools = response.data.result as UserPool[];
            }
            userPoolStore.getState().setUserPools(pools);
        } catch (error) {
            console.error(error);
        }
    },

    getUserPoolByPoolId: (poolID: string) => {
        return userPoolStore.getState().userPoolsMap.get(poolID);
    },

    getAllPoolByAccountID: async (accountID: string) => {
        try {
            const response = await api.get(`/user-pool/get-attached-by-acc-id/${accountID}`);
            return response.data.result as UserPool[];
        } catch (error) {
            return [];
        }
    }

}

export default userPoolService;