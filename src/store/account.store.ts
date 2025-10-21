import { create } from "zustand";
import Account from "../entities/account";
import { getAccessTokenFromCookie, getRefreshTokenFromCookie } from "../services/cookie-service";

interface AccountState {
  account: Account | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  clearTokens: () => void;
  setAccount: (account: Account | null) => void;
  clearAccount: () => void;
}

const accountStore = create<AccountState>((set) => ({
  account: null,
  accessToken: getAccessTokenFromCookie(),
  refreshToken: getRefreshTokenFromCookie(),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  clearTokens: () => set({ accessToken: null, refreshToken: null }),
  setAccount: (account) => set({ account }),
  clearAccount: () => set({ account: null }),
}));

export default accountStore;
