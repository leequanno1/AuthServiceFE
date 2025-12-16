import { User } from "../entities/user";
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
    },

    getUserFields: async (poolID: string) => {
        try {
            const response = await api.get(`/user-pool/user-fields/${poolID}`)
            return response.data.result as string[];
        } catch (error) {
            return [];
        }
    },

    getUsers: async (poolID: string) => {
        const response = await api.get(`/user-pool/all-users/${poolID}`)
        return response.data.result as User[];
    },

    resetPoolKey: async (poolID: string) => {
        try {
            const response = await api.post(`/user-pool/reset-pool-key/${poolID}`)
            return response.data.message as string;
        } catch (error) {
            return "";
        }
    },

    deleteUsers: async (poolID: string, users : User[]) => {
        const userIds = users.map(i => i.userId??"");
        await api.post(`/user-pool/users/delete-many/${poolID}`, userIds);
    }

}

export default userPoolService;