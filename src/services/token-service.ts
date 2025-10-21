import Account from "../entities/account"

const extractToken = (token: string | null): Account | null => {
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split(".")[1])).details as Account;
    } catch {
        return null;
    }
}

export default extractToken;