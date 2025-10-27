import { UserPool } from "../entities/user-pool";
import userPoolStore from "../store/user-pool.store";
import { api } from "./api-service";

const userPoolService = {
    
    refreshUserPool: async () => {
        // get all pool policy that currnt account have
        try {
            // get all pool policy by account id
            const response = await api.get(`/user-pool/get-all/${false}`);
            userPoolStore.getState().setUserPools([...response.data.result] as UserPool[]);
        } catch (error) {
            console.error(error);
        }
    },

    getUserPoolByPoolId: (poolID: string) => {
        return userPoolStore.getState().userPoolsMap.get(poolID);
    }

}

export default userPoolService;