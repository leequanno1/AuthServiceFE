import { create } from "zustand";
import Account from "../entities/account";
import { getAccessTokenFromCookie, getRefreshTokenFromCookie } from "../services/cookie-service";

interface AccountState {
  account: Account | null;
  rootAccount: Account | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  subAccounts?: Account[];
  subAccountMap?: Map<string,Account>;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  clearTokens: () => void;
  setAccount: (account: Account | null) => void;
  setRootAccount: (account: Account | null) => void;
  clearAccount: () => void;
  setSubAccounts: (accounts: Account[]) => void;
  clearSubAccounts: () => void;
}

const accountStore = create<AccountState>((set) => ({
  account: null,
  rootAccount: null,
  subAccounts: [],
  accessToken: getAccessTokenFromCookie(),
  refreshToken: getRefreshTokenFromCookie(),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearTokens: () => set({ accessToken: null, refreshToken: null }),
  setAccount: (account) => set({ account }),
  setRootAccount: (rootAccount) => set({ rootAccount }),
  clearAccount: () => set({ account: null, rootAccount: null }),
  setSubAccounts: (accounts) => set({
    subAccounts: accounts,
    subAccountMap: new Map(accounts.map((acc) => [acc.accountId??"", acc]))
  }),
  clearSubAccounts: () => set({
    subAccounts: [],
    subAccountMap: new Map()
  })
}));

export default accountStore;
