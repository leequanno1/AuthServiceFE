import {api} from "./api-service";
import  accountStore  from "../store/account.store";
import extractToken from "./token-service";
import {getAccessTokenFromCookie , setCookie} from "./cookie-service"
 
const accountService = {

    getAccountDetails: async () => {
        const account = extractToken(getAccessTokenFromCookie());
        console.log("Account details fetched:", account);
        accountStore.getState().setAccount(account);
    },
    
    login: async (username: string, password: string) => {
        try {
            const response = await api.post("/auth/login", { username, password });
            const { accessToken, refreshToken } = response.data.result;
            accountStore.getState().setTokens(accessToken, refreshToken);
            accountStore.getState().setAccount(extractToken(accessToken));
            // set cookies for tokens
            setCookie("accessToken", accessToken, 2 * 60);
            setCookie("refreshToken", refreshToken, 7 * 24 * 60 * 60);
        } catch (error) {
            throw error;
        }
    },

    
};

export default accountService;