import { api } from "./api-service";
import accountStore from "../store/account.store";
import extractToken from "./token-service";
import { getAccessTokenFromCookie, setCookie } from "./cookie-service";
import Account from "../entities/account";

const accountService = {
  getAccountDetails: () => {
    const account = extractToken(getAccessTokenFromCookie());
    accountStore.getState().setAccount(account);
  },

  getRootDetails: async () => {
    // root account ko có thì lấy mới
    if (!accountStore.getState().rootAccount) {
      // check current account
      if (!accountStore.getState().account?.rootId) {
        accountStore.getState().setRootAccount(accountStore.getState().account);
      } else {
        const resp2 = await api.get("/account/get-root");
        const rootAccount = resp2.data.result as Account;
        accountStore.getState().setRootAccount(rootAccount);
      }
    }
  },

  isRoot: () => {
    const account = accountStore.getState().account;
    return !account?.rootId;
  },

  login: async (username: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const { accessToken, refreshToken } = response.data.result;
      const account = extractToken(accessToken);
      accountStore.getState().setTokens(accessToken, refreshToken);
      accountStore.getState().setAccount(extractToken(accessToken));
      if (!account?.rootId) {
        accountStore.getState().setRootAccount(account);
      } else {
        const resp2 = await api.get("/account/get-root");
        const rootAccount = resp2.data.result as Account;
        accountStore.getState().setRootAccount(rootAccount);
      }
      // set cookies for tokens
      setCookie("accessToken", accessToken, 2 * 60);
      setCookie("refreshToken", refreshToken, 7 * 24 * 60 * 60);
    } catch (error) {
      throw error;
    }
  },

  refreshSubAccount: async () => {
    const parrentId = accountStore.getState().account?.accountId;
    // get sub-account from BE
    try {
      const response = await api.get(`/account/get-all/${parrentId}`);
      const subAccounts = response.data.result as Account[];
      accountStore.getState().setSubAccounts(subAccounts);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get sub-account array by parent ID
   * @param parentID string parent ID
   * @returns array of Account, if 404 then return empty array
   */
  getSubAccountsByParentID: async (parentID: string) => {
    try {
      const response = await api.get(`/account/get-all/${parentID}`);
      return response.data.result as Account[];
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  /**
   * Get all sub-account that atteched pool policy
   * @param parentID parentID
   * @param poolID poolID
   * @returns Account[]
   */
  getAttachedPoolPoliciesAccounts: async (parentID: string, poolID: string) => {
    const response = await api.get(`/pool-policy/accounts/${parentID}/${poolID}`);
    return response.data.result as Account[];
  },

  deleteAccountById: async (accountIds: string[], isDeleteSubAccounts: boolean) => {
    const response = await api.post(`/account/logical-delete`, {
      accountIds,
      isDeleteSubAccounts,
    })
    
    return response.data.result as string;
  },

  /**
   * Get account by account ID, if account is deleted or request user have no authority then return null
   * @param accountId 
   * @returns Account | null
   */
  getAccountByAccountId: async (accountId: string) => {

    try {
      const response = await api.get(`/account/get-by-id/${accountId}`);
      const account = response.data.result as Account;
      return account;
    } catch (error) {
      return null;
    }

  },
};

export default accountService;
