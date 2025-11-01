import { create } from "zustand";
import { UserPool } from "../entities/user-pool";

interface UserPoolState {
    userPools: UserPool[],
    userPoolsMap: Map<string, UserPool>,
    setUserPools: (ups: UserPool[]) => void,
    clearAll: () => void,
}

const userPoolStore = create<UserPoolState>((set) => ({
    userPools : [],
    userPoolsMap : new Map<string, UserPool>(),
    setUserPools : (ups) => set({
        userPools : ups,
        userPoolsMap: new Map(ups.map(item => [item.poolId??"", item])),
    }),
    clearAll: () => set({
        userPools: [],
        userPoolsMap: new Map(),
    })
}));

export default userPoolStore;